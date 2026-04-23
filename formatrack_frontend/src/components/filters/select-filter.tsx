import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LucideIcon } from "lucide-react";

interface SelectFilterOption {
  value: string;
  label: string;
}

interface SelectFilterProps {
  value?: string;
  onValueChange: (value: string) => void;
  options: readonly SelectFilterOption[] | SelectFilterOption[];
  placeholder?: string;
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
}

/**
 * Composant de filtre Select générique avec icône optionnelle
 * 
 * @example
 * ```tsx
 * <SelectFilter
 *   value={selectedValue}
 *   onValueChange={setSelectedValue}
 *   options={[
 *     { value: "all", label: "Tous" },
 *     { value: "active", label: "Actifs" }
 *   ]}
 *   icon={Filter}
 *   placeholder="Sélectionner..."
 * />
 * ```
 */
export function SelectFilter({
  value,
  onValueChange,
  options,
  placeholder = "Sélectionner...",
  icon: Icon,
  disabled = false,
  className = "w-full"
}: SelectFilterProps) {
  return (
    <div className={className}>
      <Select value={value || undefined} onValueChange={onValueChange} disabled={disabled}>
        <div className="relative w-full">
          {Icon && (
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none z-10" />
          )}
          <SelectTrigger className={Icon ? "pl-10" : ""}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </div>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
