import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/common";
import { LoaderCircleIcon } from "lucide-react";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/10 dark:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/90 focus-visible:ring-secondary/20 dark:focus-visible:ring-secondary/10 dark:bg-secondary/80",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/10 dark:bg-destructive/80",
        success:
          "bg-success text-success-foreground shadow-xs hover:bg-success/90 focus-visible:ring-success/20 dark:focus-visible:ring-success/10 dark:bg-success/80",
        warning:
          "bg-warning text-warning-foreground shadow-xs hover:bg-warning/90 focus-visible:ring-warning/20 dark:focus-visible:ring-warning/10 dark:bg-warning/80",
        info: "bg-info text-info-foreground shadow-xs hover:bg-info/90 focus-visible:ring-info/20 dark:focus-visible:ring-info/10 dark:bg-info/80",
        accent:
          "bg-accent text-accent-foreground shadow-xs hover:bg-accent/90 focus-visible:ring-accent/20 dark:focus-visible:ring-accent/10 dark:bg-accent/80",

        outline:
          "border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/5 dark:border-input dark:hover:bg-input/80",
        "outline-destructive":
          "text-destructive border border-destructive/90 bg-destructive/5 shadow-xs hover:bg-destructive/90 hover:text-destructive-foreground dark:bg-destructive/5 dark:border-destructive/80 dark:hover:bg-destructive/80",
        "outline-success":
          "text-success border border-success/90 bg-success/5 shadow-xs hover:bg-success/90 hover:text-success-foreground dark:bg-success/5 dark:border-success/80 dark:hover:bg-success/80",
        "outline-warning":
          "text-warning border border-warning/90 bg-warning/5 shadow-xs hover:bg-warning/90 hover:text-warning-foreground dark:bg-warning/5 dark:border-warning/80 dark:hover:bg-warning/80",
        "outline-info":
          "text-info border border-info/90 bg-info/5 shadow-xs hover:bg-info/90 hover:text-info-foreground dark:bg-info/5 dark:border-info/80 dark:hover:bg-info/80",

        ghost: "hover:bg-background dark:hover:bg-input/80",
        "ghost-primary":
          "text-primary hover:bg-primary/90 hover:text-primary-foreground dark:hover:bg-primary/80",
        "ghost-destructive":
          "text-destructive hover:bg-destructive/90 hover:text-destructive-foreground dark:hover:bg-destructive/80",
        "ghost-success":
          "text-success hover:bg-success/90 hover:text-success-foreground dark:hover:bg-success/80",
        "ghost-warning":
          "text-warning hover:bg-warning/90 hover:text-warning-foreground dark:hover:bg-warning/80",
        "ghost-info":
          "text-info hover:bg-info/90 hover:text-info-foreground dark:hover:bg-info/80",

        link: "text-primary underline-offset-4 hover:underline",
        "link-destructive":
          "text-destructive underline-offset-4 hover:underline",
        "link-success": "text-success underline-offset-4 hover:underline",
        "link-warning": "text-warning underline-offset-4 hover:underline",
        "link-info": "text-info underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-7 px-2 py-1 has-[>svg]:px-2.5",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        xl: "h-12 rounded-md px-8 has-[>svg]:px-6",
        icon: "size-9",
        "icon-xs": "size-7",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        "icon-xl": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || isLoading}
      {...props}
    >
      {asChild ? (
        React.Children.only(children)
      ) : (
        <>
          {isLoading && (
            <LoaderCircleIcon
              className="size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          {children}
        </>
      )}
    </Comp>
  );
}

export { Button, buttonVariants, type ButtonProps };
