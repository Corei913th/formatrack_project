import { cn } from "@/utils/common";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface ConfirmDialogProps {
  isOpen: boolean;
  isLoading?: boolean;
  onDismiss: (state: boolean) => void;
  onAction: () => void;
  className?: string;
  messages: {
    title: string;
    description?: string;
    buttons?: {
      cancel?: string;
      action?: string;
    };
  };
}

export function ConfirmDialog({
  isOpen,
  isLoading,
  onDismiss,
  onAction,
  messages,
  className,
}: ConfirmDialogProps) {
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={isLoading ? undefined : onDismiss}
      aria-describedby={undefined}
    >
      <AlertDialogContent
        className={cn("sm:max-w-md", className)}
        aria-describedby={undefined}
      >
        <AlertDialogHeader>
          <AlertDialogTitle
            dangerouslySetInnerHTML={{
              __html: messages.title,
            }}
          />
          {messages.description && (
            <AlertDialogDescription>
              <span
                dangerouslySetInnerHTML={{
                  __html: messages.description,
                }}
              />
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter>
          <Button
            disabled={isLoading}
            variant="ghost"
            onClick={() => onDismiss(false)}
          >
            {messages.buttons?.cancel || "Non, annuler"}
          </Button>

          <Button onClick={onAction} isLoading={isLoading}>
            {messages.buttons?.action || "Oui, continuer"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
