import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/common";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import useLockBodyScroll from "@/hooks/use-lock-body-scroll";
import useEscapeKey from "@/hooks/use-escape-key";
import type { IModalProps, ModalSize, ModalActionProps } from "@/types/ui/ui";

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  "2xl": "max-w-5xl",
  "3xl": "max-w-6xl",
  "4xl": "max-w-7xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  full: "max-w-6xl",
};

const sizeClassNames: Record<ModalSize, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  "4xl": "sm:max-w-4xl",
  "5xl": "sm:max-w-5xl",
  "6xl": "sm:max-w-6xl",
  full: "sm:max-w-[calc(100vw-2rem)]",
};

const Modal: React.FC<IModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  showCloseButton = false,
  closeButtonLabel = "Fermer",
  className,
  contentClassName,
  size = "md",
  closeOnClickOutside = true,
  closeOnOverlayClick = true,
  useCustomAnimation = false,
}) => {
  useLockBodyScroll(isOpen);
  useEscapeKey(isOpen, onClose);

  if (useCustomAnimation) {
    return (
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="presentation"
          >
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="modal-animate fixed inset-0 bg-black/50 z-40"
              onClick={() => closeOnOverlayClick && onClose()}
              aria-hidden
            />

            {/* Modal Container */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className={cn(
                "relative z-50 w-full bg-white rounded-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto",
                sizeClasses[size],
                className
              )}
            >
              {/* Header */}
              <motion.div
                className="flex items-center justify-between p-6 border-b border-gray-200"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <h2
                  id="modal-title"
                  className="text-xl font-semibold text-gray-900"
                >
                  {title}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </motion.div>

              {/* Content */}
              <motion.div
                className={cn("p-6", contentClassName)}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {description && (
                  <p className="text-gray-600 mb-4">{description}</p>
                )}
                {children}
              </motion.div>

              {/* Footer */}
              {(footer || showCloseButton) && (
                <motion.div
                  className="flex items-center justify-end gap-2 p-6 border-t border-gray-200"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  {showCloseButton && (
                    <Button variant="outline" onClick={onClose}>
                      {closeButtonLabel}
                    </Button>
                  )}
                  {footer}
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  // Version avec Dialog (shadcn/ui)
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && closeOnClickOutside && onClose()}
    >
      <DialogContent
        className={cn(
          "sm:max-h-[calc(100vh-6rem)] overflow-y-auto",
          sizeClassNames[size],
          className
        )}
        onEscapeKeyDown={onClose}
      >
        {(title || description) && (
          <DialogHeader className={cn("space-y-1", contentClassName)}>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        <div className={cn("pt-8", contentClassName)}>{children}</div>

        {(footer || showCloseButton) && (
          <DialogFooter
            className={cn(
              "flex items-center justify-end gap-2",
              contentClassName
            )}
          >
            {showCloseButton && (
              <Button variant="outline" onClick={onClose}>
                {closeButtonLabel}
              </Button>
            )}
            {footer}
          </DialogFooter>
        )}

        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export function ModalActions({ children, className }: ModalActionProps) {
  return (
    <div className={cn("flex items-center justify-end gap-2", className)}>
      {children}
    </div>
  );
}

export default Modal;
