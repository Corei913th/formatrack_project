import { AxiosError } from "axios";
import { toast } from "sonner";
import type { ApiResponse as Response } from "@/types/api.type";



export const refractHttpError = (error: unknown): Response => {


  let title = "SERVER ERROR";
  let message =
    "Une erreur est survenue. Si elle persiste, contactez le support";


  if (error instanceof AxiosError) {
    const errorData = error.response?.data as {
      data?: { ui_notification?: { type: string; title?: string; message: string; duration?: number } };
      message?: string;
      error?: string | { user_message?: string; message?: string };
      errors?: string[];
    };

    const ui = errorData?.data?.ui_notification;
    if (ui?.message) {
      const type = ui.type;
      const t = ui.title;
      const m = ui.message;
      if (type === "warning") {
        toast.warning(t ?? title, { description: m, duration: ui.duration });
      } else if (type === "success") {
        toast.success(m, { duration: ui.duration });
      } else {
        toast.error(t ?? title, { description: m, duration: ui.duration });
      }

      return {
        success: false,
        message: m,
        data: null,
      };
    }

    // Essayer différents formats de message d'erreur
    if (errorData?.message) {
      message = errorData.message;
    } else if (errorData?.error) {
      const errDetail = errorData.error;
      if (typeof errDetail === "string") {
        message = errDetail;
      } else if (errDetail?.user_message) {
        message = errDetail.user_message;
      } else if (errDetail?.message) {
        message = errDetail.message;
      } else {
        try {
          message = JSON.stringify(errDetail);
        } catch {
          message = "Une erreur est survenue.";
        }
      }
    } else if (errorData?.errors && Array.isArray(errorData.errors)) {
      // Pour les erreurs de validation multiples
      message = error.response?.data.errors.join(', ');
    } else if (typeof error.response?.data === 'string') {
      message = error.response.data;
    } else if (error.message) {
      message = error.message;
    }

    // Gestion spécifique des codes d'erreur HTTP
    const status = error.status || error.response?.status;

    switch (status) {
      case 400:
        title = "DONNÉES INVALIDES";
        if (!message || message === "Une erreur est survenue. Si elle persiste, contactez le support") {
          message = "Les données saisies sont invalides. Vérifiez vos informations et réessayez.";
        }
        break;

      case 401:
      case 403:
        title = "AUTHENTIFICATION";
        message = "Vous n'êtes pas autorisé à effectuer cette action.";
        break;

      case 404:
        title = "RESSOURCE NON TROUVÉE";
        message = "La ressource demandée n'existe pas.";
        break;

      case 422:
        title = "DONNÉES INVALIDES";
        message = message || "Les données saisies ne respectent pas les règles de validation.";
        break;

      case 429:
        title = "TROP DE REQUÊTES";
        message = "Trop de requêtes ont été effectuées. Veuillez patienter avant de réessayer.";
        break;

      case 500:
        title = "ERREUR SERVEUR";
        message = "Une erreur interne du serveur s'est produite. Veuillez réessayer plus tard.";
        break;
    }

    // Gestion des erreurs réseau
    if (error.code === "ERR_NETWORK") {
      title = "ERREUR RÉSEAU";
      message = "Vérifiez votre connexion internet et réessayez";
    }

    // Gestion des erreurs de timeout
    if (error.code === "ECONNABORTED") {
      title = "TIMEOUT";
      message = "La requête a pris trop de temps. Vérifiez votre connexion et réessayez.";
    }
  }

  const isProduction = import.meta.env.VITE_NODE_ENV === "production";

  if (!isProduction) {
    console.error(title, message, error);
  }

  toast.error(title, {
    description: message,
  });

  return {
    success: false,
    message,
    data: null,
  };
};


export const getErrorMessage = (error: unknown, fallbackMessage: string = 'Une erreur inattendue s\'est produite'): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return fallbackMessage;
};


export const handleMutationError = (error: unknown, fallbackMessage: string = 'Une erreur s\'est produite') => {
  const message = getErrorMessage(error, fallbackMessage);
  toast.error(message);
  return message;
};

