import { refractHttpError } from "@/utils/errors";
import { LoginDTO } from "@/modules/auth";
import { baseHttpClient } from "@/lib/baseHttpClient";
import { AuthResponse, SessionResponse } from "../types/auth.type";
import localStorage from "@/lib/localStorage";
import {
  REFRESH_TOKEN_KEY_NAME,
  TOKEN_KEY_NAME,
  REFRESH_LEEWAY_SECONDS,
} from "@/constants/session.constants";
import { decodeExp } from "@/utils/jwt";
import { ApiResponse } from '@/types/api.type';
import { User } from "@/modules/users";



class AuthService {
  private refreshInProgress: Promise<string | null> | null = null;
  private refreshTimer: number | null = null;

  constructor() { }

  /* --------------------------- AUTH OPERATIONS --------------------------- */

  login = async (credentials: LoginDTO) => {
    try {
      const res = await baseHttpClient.post<ApiResponse<AuthResponse>>(
        "auth/login",
        credentials
      );


      if (res.data?.success && res.data.data) {
        this.storeTokens(
          res.data.data.access_token,
          res.data.data.refresh_token
        );
      }

      return res.data;
    } catch (error) {
      throw refractHttpError(error);
    }
  };

  logout = async () => {
    try {
      const refreshToken = this.getRefreshToken();

      if (refreshToken) {

        await baseHttpClient.post("auth/logout", {
          refresh_token: refreshToken
        });
      }
    } catch (error) {
      console.warn("Logout API call failed:", error);
    } finally {
      this.clearTokens();
      this.cancelTimer();
    }
  };



  getProfile = async () => {
    try {
      const res = await baseHttpClient.get<ApiResponse<User>>("auth/me");
      return res.data;
    } catch (error) {
      throw refractHttpError(error);
    }
  };

  async refreshToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    // Appel avec le refresh token en Bearer header (géré par l'intercepteur)
    // On stocke temporairement le refresh token comme access token pour cet appel
    const currentAccess = this.getAccessToken();
    localStorage.set(TOKEN_KEY_NAME, refreshToken);

    try {
      const response = await baseHttpClient.post<ApiResponse<SessionResponse>>(
        "auth/refresh"
      );

      if (!response.data?.data?.access_token) {
        this.clearTokens();
        throw new Error("Refresh token invalid or expired");
      }

      const accessToken = response.data.data.access_token;
      const newRefresh = response.data.data.refresh_token;

      this.storeTokens(accessToken, newRefresh);

      return {
        access_token: accessToken,
        refresh_token: newRefresh,
      };
    } catch (e) {
      // Restaurer l'ancien token si le refresh échoue
      if (currentAccess) localStorage.set(TOKEN_KEY_NAME, currentAccess);
      throw e;
    }
  }




  getAccessToken() {
    const token = localStorage.get(TOKEN_KEY_NAME);
    //console.log("Getting access token:", token);
    return token;
  }

  getRefreshToken() {
    return localStorage.get(REFRESH_TOKEN_KEY_NAME);
  }

  storeTokens(access: string, refresh?: string) {
    //console.log("Storing access token:", access);
    //console.log("Storing refresh token:", refresh);

    if (!access || access === "undefined" || access === "null") {
      console.error("Invalid access token provided:", access);
      return;
    }

    localStorage.set(TOKEN_KEY_NAME, access);
    if (refresh && refresh !== "undefined" && refresh !== "null") {
      localStorage.set(REFRESH_TOKEN_KEY_NAME, refresh);
    }
    //console.log("Tokens stored successfully");
    localStorage.debug();
  }

  clearTokens() {
    localStorage.remove(TOKEN_KEY_NAME);
    localStorage.remove(REFRESH_TOKEN_KEY_NAME);
  }




  scheduleProactiveRefresh(
    doRefresh: (refreshToken: string) => Promise<{
      access_token: string;
      refresh_token?: string;
    }>
  ) {

    const token = this.getAccessToken();
    if (!token) return;

    const exp = decodeExp(token);
    if (!exp) return;

    const now = Date.now();
    const refreshAt = exp * 1000 - REFRESH_LEEWAY_SECONDS * 1000;
    const delay = Math.max(1000, refreshAt - now);


    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }

    this.refreshTimer = window.setTimeout(() => {
      this.refresh(doRefresh);
    }, delay);
  }

  async refresh(
    doRefresh: (
      refreshToken: string
    ) => Promise<{ access_token: string; refresh_token?: string }>
  ) {
    const refreshTokenValue = this.getRefreshToken();
    if (!refreshTokenValue) return null;

    // Si un refresh est déjà en cours, attendre la promesse existante
    if (this.refreshInProgress instanceof Promise) {
      return this.refreshInProgress;
    }

    // Créer la promesse et la stocker
    this.refreshInProgress = (async () => {
      try {
        const res = await doRefresh(refreshTokenValue);

        if (!res.access_token) {
          this.clearTokens();
          return null;
        }

        this.storeTokens(res.access_token, res.refresh_token);
        return res.access_token;
      } catch {
        this.clearTokens();
        return null;
      } finally {
        // Nettoyer la promesse après qu’elle soit résolue
        this.refreshInProgress = null;
      }
    })();

    // Retourner la promesse pour toutes les requêtes concurrentes
    return this.refreshInProgress;
  }


  cancelTimer() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }
}

export const authService = new AuthService();
