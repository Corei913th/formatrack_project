import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StatusFilterOption {
  value: string;
  label: string;
}

interface StatusFilterProps {
  value?: string;
  onValueChange: (value: string) => void;
  options: readonly StatusFilterOption[];
  placeholder?: string;
  className?: string;
}

export const StatusFilter = ({
  value,
  onValueChange,
  options,
  placeholder = "Tous les statuts",
  className = "w-37.5"
}: StatusFilterProps) => {
  return (
    <Select value={value || "all"} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};