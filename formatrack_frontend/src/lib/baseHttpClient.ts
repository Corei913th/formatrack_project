import { BASE_URL, REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE, UNAUTHORIZED_STATUS_NUMBERS } from "@/constants/api.constants";
import { TOKEN_KEY_NAME } from "@/constants/session.constants";
import axios from "axios";
import { toast } from "sonner";
import localstorage from "./localStorage";

export const baseHttpClient = axios.create({
  baseURL: BASE_URL,
  // timeout: 60000,
  // withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

baseHttpClient.interceptors.request.use(
  (config) => {
    const token = localstorage.get(TOKEN_KEY_NAME);

    if (token) {
      config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE} ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour afficher les messages d'erreur clairs de l'API
baseHttpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    // Afficher les notifications d'erreur de l'API si disponibles
    if (response?.data?.ui_notification) {
      const notification = response.data.ui_notification;
      const duration = notification.duration || 5000;

      switch (notification.type) {
        case "error":
          toast.error(notification.message, {
            description: notification.title,
            duration,
          });
          break;
        case "warning":
          toast.warning(notification.message, {
            description: notification.title,
            duration,
          });
          break;
        case "info":
          toast.info(notification.message, {
            description: notification.title,
            duration,
          });
          break;
        case "success":
          toast.success(notification.message, {
            description: notification.title,
            duration,
          });
          break;
      }
    } else if (response?.data?.error?.user_message) {
      // Fallback: afficher le user_message si ui_notification n'existe pas
      toast.error(response.data.error.user_message, {
        description: response.data.error.message,
        duration: 5000,
      });
    }

    return Promise.reject(error);
  }
);

export const interceptUnauthorized = (callback: () => void) => {
  baseHttpClient.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response } = error;

      if (response && UNAUTHORIZED_STATUS_NUMBERS.includes(response.status)) {
        callback();
      }

      return Promise.reject(error);
    }
  );
};
