import { useState, useCallback } from "react";

export interface PageFiltersConfig<T> {
  initialFilters?: T;
  onPageReset?: () => void;
}

export interface UsePageFiltersReturn<T> {
  filters: T;
  setFilters: React.Dispatch<React.SetStateAction<T>>;
  updateFilter: <K extends keyof T>(key: K, value: T[K]) => void;
  resetFilters: () => void;
  hasActiveFilters: (excludeKeys?: (keyof T)[]) => boolean;
}

/**
 * Hook générique pour gérer les filtres d'une page
 * @param config Configuration avec filtres initiaux
 */
export function usePageFilters<T extends Record<string, any>>(
  config: PageFiltersConfig<T>
): UsePageFiltersReturn<T> {
  const { initialFilters = {} as T, onPageReset } = config;
  const [filters, setFilters] = useState<T>(initialFilters);

  const updateFilter = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    onPageReset?.();
  }, [onPageReset]);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    onPageReset?.();
  }, [initialFilters, onPageReset]);

  const hasActiveFilters = useCallback((excludeKeys: (keyof T)[] = []) => {
    return Object.entries(filters).some(([key, value]) => {
      if (excludeKeys.includes(key as keyof T)) return false;

      // Check if filter is active
      if (value === undefined || value === null || value === "") return false;
      if (value === "all" || value === "ALL") return false;
      if (typeof value === "boolean" && value === false) return false;

      return true;
    });
  }, [filters]);

  return {
    filters,
    setFilters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
  };
}
