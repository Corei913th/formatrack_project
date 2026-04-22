import { useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/errors";
import { baseHttpClient } from "@/lib/baseHttpClient";

interface UseDownloadOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

/**
 * Hook personnalisé pour gérer les téléchargements de fichiers
 * Gère automatiquement le loading, les erreurs et le téléchargement du blob
 */
export function useDownload(options?: UseDownloadOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Télécharge un fichier depuis une URL
   * @param url - URL du fichier à télécharger
   * @param filename - Nom du fichier à sauvegarder
   * @param acceptType - Type MIME accepté (default: application/pdf)
   */
  const download = async (
    url: string,
    filename: string,
    acceptType: string = "application/pdf"
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await baseHttpClient.get(url, {
        headers: {
          Accept: acceptType,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
        responseType: "blob",
      });

      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

      toast.success("Fichier téléchargé avec succès");
      options?.onSuccess?.();
    } catch (err: unknown) {
      // Si l'erreur contient un blob, essayer de le lire comme JSON
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as any;
        if (
          axiosError.response?.data instanceof Blob &&
          axiosError.response.data.type === "application/json"
        ) {
          try {
            const text = await axiosError.response.data.text();
            const jsonError = JSON.parse(text);
            const errorMessage =
              jsonError.message || "Erreur lors du téléchargement";
            setError(errorMessage);
            toast.error(errorMessage);
            options?.onError?.(err);
            throw err;
          } catch (parseError) {
            // Si on ne peut pas parser, utiliser le message par défaut
          }
        }
      }

      const errorMessage = getErrorMessage(
        err,
        "Erreur lors du téléchargement"
      );
      setError(errorMessage);
      toast.error(errorMessage);
      options?.onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { download, loading, error };
}
