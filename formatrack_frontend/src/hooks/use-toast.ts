import { toast } from "sonner";

type ToastType = "success" | "error" | "warning";

export const useToast = () => {
  const show = (type: ToastType, message: string) => {
    toast[type](message);
  };

  return {
    success: (msg: string) => show("success", msg),
    error: (msg: string) => show("error", msg),
    warning: (msg: string) => show("warning", msg),
  };
};
