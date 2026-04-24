import React, { ReactNode } from "react";

export type ModalSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "full";

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  size?: ModalSize;
  /** If true, clicking the overlay closes the modal */
  closeOnOverlayClick?: boolean;
  description?: string;
  footer?: ReactNode;
  showCloseButton?: boolean;
  closeButtonLabel?: string;
  className?: string;
  contentClassName?: string;
  closeOnClickOutside?: boolean;
  useCustomAnimation?: boolean;
}

export type ModalActionProps = {
  children: ReactNode;
  className?: string;
};

export default {} as const;
