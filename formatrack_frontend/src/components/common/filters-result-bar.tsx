import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface FiltersResultBarProps {
  /** Nombre total de résultats après filtrage */
  totalResults: number;
  /** Indique si des filtres sont actifs */
  hasActiveFilters: boolean;
  /** Callback pour réinitialiser les filtres */
  onReset: () => void;
  /** Texte personnalisé pour le compteur (optionnel) */
  resultText?: string;
  /** Classe CSS additionnelle */
  className?: string;
}

/**
 * Barre affichant le nombre de résultats et un bouton pour réinitialiser les filtres
 * 
 * @example
 * ```tsx
 * <FiltersResultBar
 *   totalResults={filteredData.length}
 *   hasActiveFilters={search !== "" || status !== "ALL"}
 *   onReset={() => {
 *     setSearch("");
 *     setStatus("ALL");
 *   }}
 * />
 * ```
 */
export function FiltersResultBar({
  totalResults,
  hasActiveFilters,
  onReset,
  resultText,
  className = "",
}: FiltersResultBarProps) {
  return (
    <div className={`flex items-center justify-between pt-2 border-t ${className}`}>
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{totalResults}</span>{" "}
        {resultText || "résultat(s) trouvé(s)"}
      </p>
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="h-8"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Réinitialiser les filtres
        </Button>
      )}
    </div>
  );
}
