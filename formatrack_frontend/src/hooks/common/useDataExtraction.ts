import { useMemo } from 'react';

export function useDataExtraction<T>(response: any) {
  return useMemo(() => {
    if (!response?.data) {
      return { data: [] as T[], meta: undefined };
    }

    const isArray = Array.isArray(response.data);

    return {
      data: (isArray ? response.data : (response.data as any)?.data || []) as T[],
      meta: isArray ? undefined : (response.data as any)?.meta,
    };
  }, [response]);
}
