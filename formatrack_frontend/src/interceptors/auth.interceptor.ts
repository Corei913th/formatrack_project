import { authService } from '@/modules/auth';
import { baseHttpClient } from "@/lib/baseHttpClient";
import { UNAUTHORIZED_STATUS_NUMBERS } from "@/constants/api.constants";

let installed = false;



export function installAuthInterceptor(
  doRefresh: (refreshToken: string) => Promise<{
    access_token: string;
    refresh_token?: string | undefined;
  }>
) {
  if (installed) return;
  installed = true;

  baseHttpClient.interceptors.response.use(
    r => r,
    async (error) => {
      const status = error?.response?.status;
      const originalRequest = error.config;

      // On ne tente un refresh QUE sur 401
      if (!UNAUTHORIZED_STATUS_NUMBERS.includes(status)) {
        return Promise.reject(error);
      }

      //  éviter boucle infinie
      if (originalRequest._retry) {
        authService.clearTokens();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      const newToken = await authService.refresh(doRefresh);
      if (!newToken) {
        authService.clearTokens();
        return Promise.reject(error);
      }

      // Retry avec le nouveau token
      originalRequest.headers ??= {};
      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return baseHttpClient.request(originalRequest);
    }
  );
}
