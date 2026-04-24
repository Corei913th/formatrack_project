import * as React from "react";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/common";
import type { IconType } from "@/types/common.type";
import { Button } from "./button";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  icon?: IconType;
  rightIcon?: React.ReactNode;
  error?: boolean | string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  useAnimations?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      value,
      onChange,
      icon: Icon,
      rightIcon,
      error,
      className = "h-[2.8rem]",
      type = "text",
      showPassword,
      onTogglePassword,
      useAnimations = false,
      ...props
    },
    ref
  ) => {
    const inputType =
      type === "password" && showPassword !== undefined
        ? showPassword
          ? "text"
          : "password"
        : type;

    const baseInputClasses = cn(
      "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      Icon ? "pl-10 pr-3" : "px-3",
      error
        ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
        : "",
      className
    );

    const inputProps = {
      ref,
      className: baseInputClasses,
      value,
      onChange,
      type: inputType,
      "data-slot": "input",
      "aria-invalid": error ? true : undefined,
      ...(useAnimations && {
        whileFocus: { scale: 1.01 },
        transition: { duration: 0.2 },
      }),
      ...props,
    };

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          )}

          {useAnimations ? (
            <motion.input {...(inputProps as React.ComponentProps<typeof motion.input>)} />
          ) : (
            <input {...inputProps} />
          )}

          {rightIcon && (
            <Button
              type="button"
              variant={"ghost"}
              className="absolute  right-3 top-1/2 transform -translate-y-1/2 cursor-pointer select-none text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
              onClick={onTogglePassword}
              aria-label={
                type === "password" ? "Toggle password visibility" : undefined
              }
            >
              {rightIcon}
            </Button>
          )}
        </div>
        {error && (
          <p className="text-xs text-destructive mt-1">
            {typeof error === "string" ? error : "Erreur"}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
export default Input;
