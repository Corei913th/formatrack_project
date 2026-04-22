import { useMemo } from 'react';

interface EntityWithStatus {
  is_active: boolean;
}

interface UseActiveInactiveStatsOptions<T extends EntityWithStatus> {
  data: T[];
}

export function useActiveInactiveStats<T extends EntityWithStatus>({ data }: UseActiveInactiveStatsOptions<T>) {
  return useMemo(() => {
    const actifs = data.filter((item) => item.is_active).length;
    const inactifs = data.filter((item) => !item.is_active).length;

    return {
      total: data.length,
      actifs,
      inactifs,
    };
  }, [data]);
}
