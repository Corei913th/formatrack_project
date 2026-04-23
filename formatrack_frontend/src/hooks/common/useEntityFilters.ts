import { useState, useCallback } from 'react';

interface UseEntityFiltersOptions<T> {
  initialFilters?: T;
  onPageReset?: () => void;
}

export function useEntityFilters<T extends Record<string, any>>({
  initialFilters = {} as T,
  onPageReset,
}: UseEntityFiltersOptions<T> = {}) {
  const [filters, setFilters] = useState<T>(initialFilters);

  const updateFilter = useCallback((key: keyof T, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    onPageReset?.();
  }, [onPageReset]);

  const handleSearch = useCallback((search: string) => {
    updateFilter('search' as keyof T, search || undefined);
  }, [updateFilter]);

  const handleStatusFilter = useCallback((status: string) => {
    updateFilter('is_active' as keyof T,
      status === "all" ? undefined : status === "active"
    );
  }, [updateFilter]);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    onPageReset?.();
  }, [initialFilters, onPageReset]);

  return {
    filters,
    setFilters,
    updateFilter,
    handleSearch,
    handleStatusFilter,
    resetFilters,
  };
}
