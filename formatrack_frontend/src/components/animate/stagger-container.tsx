import { ReactNode } from "react";
import { cn } from "@/utils/common";

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export const StaggerContainer = ({ children, staggerDelay = 0.1, className }: StaggerContainerProps) => {
  return (
    <div className={cn("stagger-container", className)} style={{ "--stagger-delay": `${staggerDelay}s` } as React.CSSProperties}>
      {children}
    </div>
  );
};

export const StaggerItem = ({ children, className }: StaggerItemProps) => {
  return (
    <div className={cn("stagger-item animate-fade-in-up", className)}>
      {children}
    </div>
  );
};