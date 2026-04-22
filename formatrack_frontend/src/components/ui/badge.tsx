import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/common";

export type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "success"
  | "warning"
  | "info"
  | "outline"
  | "outline-destructive"
  | "outline-success"
  | "outline-warning"
  | "outline-info"
  | "fade"
  | "fade-primary"
  | "fade-destructive"
  | "fade-success"
  | "fade-warning"
  | "fade-info";

export type BadgeSize = "sm" | "default" | "lg";

export const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden [&_svg]:size-3",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90 dark:bg-primary/80 dark:[a&]:hover:bg-primary/70",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 dark:bg-secondary/80 dark:[a&]:hover:bg-secondary/70",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 dark:bg-destructive/80 dark:[a&]:hover:bg-destructive/70",
        success:
          "border-transparent bg-success text-success-foreground [a&]:hover:bg-success/90 dark:bg-success/80 dark:[a&]:hover:bg-success/70",
        warning:
          "border-transparent bg-warning text-warning-foreground [a&]:hover:bg-warning/90 dark:bg-warning/80 dark:[a&]:hover:bg-warning/70",
        info: "border-transparent bg-info text-info-foreground [a&]:hover:bg-info/90 dark:bg-info/80 dark:[a&]:hover:bg-info/70",

        outline:
          "text-foreground border-accent/70 dark:border-accent/30 [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        "outline-destructive":
          "text-destructive border-destructive/70 dark:border-destructive/30 [a&]:hover:bg-destructive [a&]:hover:text-destructive-foreground",
        "outline-success":
          "text-success border-success/70 dark:border-success/30 [a&]:hover:bg-success [a&]:hover:text-success-foreground",
        "outline-warning":
          "text-warning border-warning/70 dark:border-warning/30 [a&]:hover:bg-warning [a&]:hover:text-warning-foreground",
        "outline-info":
          "text-info border-info/70 dark:border-info/30 [a&]:hover:bg-info [a&]:hover:text-info-foreground",

        fade: "border-border/40 bg-background/20 dark:bg-input/20 text-foreground [a&]:hover:bg-background dark:[a&]:hover:bg-input/80",
        "fade-primary":
          "border-primary/40 bg-primary/20 text-primary [a&]:hover:bg-primary/90 [a&]:hover:text-primary-foreground dark:[a&]:hover:bg-primary/80",
        "fade-destructive":
          "border-destructive/40 bg-destructive/20 text-destructive [a&]:hover:bg-destructive/90 [a&]:hover:text-destructive-foreground dark:[a&]:hover:bg-destructive/80",
        "fade-success":
          "border-success/40 bg-success/20 text-success [a&]:hover:bg-success/90 [a&]:hover:text-success-foreground dark:[a&]:hover:bg-success/80",
        "fade-warning":
          "border-warning/40 bg-warning/20 text-warning [a&]:hover:bg-warning/90 [a&]:hover:text-warning-foreground dark:[a&]:hover:bg-warning/80",
        "fade-info":
          "border-info/40 bg-info/20 text-info [a&]:hover:bg-info/90 [a&]:hover:text-info-foreground dark:[a&]:hover:bg-info/80",
      },
      size: {
        xs: "px-1.5 py-px text-[0.6rem] [&>svg]:size-2 [&_svg]:size-2 [&_svg]:pointer-events-none",
        sm: "px-2 py-0.5 text-xs [&>svg]:size-3 [&_svg]:size-3 [&_svg]:pointer-events-none",
        default: "px-2 py-1 text-xs [&>svg]:size-3.5 [&_svg]:size-3.5 [&_svg]:pointer-events-none gap-1.5",
        lg: "px-2 py-1.5 text-sm [&>svg]:size-3.5 [&_svg]:size-3.5 [&_svg]:pointer-events-none gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return <Comp data-slot="badge" className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}
