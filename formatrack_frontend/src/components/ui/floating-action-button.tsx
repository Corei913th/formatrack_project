import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils/common";
import { LucideIcon, Plus, X } from "lucide-react";

export interface FABAction {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary";
  disabled?: boolean;
  loading?: boolean;
}

interface FloatingActionButtonProps {
  actions: FABAction[];
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  className?: string;
  mainIcon?: LucideIcon;
  mainLabel?: string;
}

const positionClasses = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "top-right": "top-6 right-6",
  "top-left": "top-6 left-6",
};

export function FloatingActionButton({
  actions,
  position = "bottom-right",
  className,
  mainIcon: MainIcon = Plus,
  mainLabel = "Actions rapides",
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Si une seule action, afficher directement le bouton
  if (actions.length === 1) {
    const action = actions[0];
    const Icon = action.icon;
    return (
      <div className={cn("fixed z-50", positionClasses[position], className)}>
        <Button
          size="lg"
          onClick={action.onClick}
          disabled={action.disabled || action.loading}
          variant={action.variant || "default"}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all"
          aria-label={action.label}
        >
          <Icon className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  // Plusieurs actions: afficher un menu dropdown
  return (
    <div className={cn("fixed z-50", positionClasses[position], className)}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            size="lg"
            className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all"
            aria-label={mainLabel}
          >
            {isOpen ? (
              <X className="h-6 w-6 transition-transform rotate-90" />
            ) : (
              <MainIcon className="h-6 w-6" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={position.includes("right") ? "end" : "start"}
          side="top"
          className="w-56"
        >
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div key={index}>
                <DropdownMenuItem
                  onClick={action.onClick}
                  disabled={action.disabled || action.loading}
                  className={cn(
                    "cursor-pointer",
                    action.variant === "destructive" && "text-destructive focus:text-destructive"
                  )}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {action.label}
                  {action.loading && (
                    <span className="ml-auto text-xs text-muted-foreground">...</span>
                  )}
                </DropdownMenuItem>
                {index < actions.length - 1 && actions[index + 1].variant === "destructive" && (
                  <DropdownMenuSeparator />
                )}
              </div>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// Variante avec expansion verticale (style Speed Dial)
export function FloatingActionButtonSpeedDial({
  actions,
  position = "bottom-right",
  className,
  mainIcon: MainIcon = Plus,
  mainLabel = "Actions rapides",
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("fixed z-50 flex flex-col gap-3", positionClasses[position], className)}>
      {/* Actions secondaires */}
      {isOpen && (
        <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {position.includes("right") && (
                  <span className="text-sm font-medium bg-card px-3 py-1 rounded-md shadow-sm border">
                    {action.label}
                  </span>
                )}
                <Button
                  size="lg"
                  onClick={() => {
                    action.onClick();
                    setIsOpen(false);
                  }}
                  disabled={action.disabled || action.loading}
                  variant={action.variant || "secondary"}
                  className="h-12 w-12 rounded-full shadow-md hover:shadow-lg transition-all"
                  aria-label={action.label}
                >
                  <Icon className="h-5 w-5" />
                </Button>
                {position.includes("left") && (
                  <span className="text-sm font-medium bg-card px-3 py-1 rounded-md shadow-sm border">
                    {action.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Bouton principal */}
      <Button
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all ml-auto"
        aria-label={mainLabel}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="h-6 w-6 transition-transform rotate-90" />
        ) : (
          <MainIcon className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
}
