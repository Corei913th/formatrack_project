import { ReactNode } from "react";
import { cn } from "@/utils/common";

interface FadeInProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
  className?: string;
}

export const FadeIn = ({
  children,
  direction = "up",
  duration = 0.5,
  delay = 0,
  className
}: FadeInProps) => {
  const directionClasses = {
    up: "animate-fade-in-up",
    down: "animate-fade-in-down",
    left: "animate-fade-in-left",
    right: "animate-fade-in-right"
  };

  return (
    <div
      className={cn(directionClasses[direction], className)}
      style={{
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationFillMode: "both"
      }}
    >
      {children}
    </div>
  );
};