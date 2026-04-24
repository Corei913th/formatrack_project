import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchFilterProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchFilter = ({
  value,
  onValueChange,
  placeholder = "Rechercher...",
  className = "flex-1 min-w-50"
}: SearchFilterProps) => {
  return (
    <div className={className}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={placeholder}
          className="pl-10"
          value={value || ""}
          onChange={(e) => onValueChange(e.target.value)}
        />
      </div>
    </div>
  );
};