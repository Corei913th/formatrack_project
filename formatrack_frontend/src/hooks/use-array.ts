import { useCallback, useState } from "react";

export interface UseArrayOptions<T> {
  /**
   * Optional callback fired every time the array state changes.
   */
  onRemoved?: (index: number) => void;
  onAdded?: (index: number) => void;
  onChange?: (next: T[]) => void;
}

export interface UseArrayActions<T> {
  set: React.Dispatch<React.SetStateAction<T[]>>;
  push: (...items: T[]) => void;
  unshift: (...items: T[]) => void;
  pop: () => T | undefined;
  shift: () => T | undefined;
  clear: () => void;
  removeIndex: (index: number) => void;
  updateIndex: (index: number, newItem: T) => void;
  filter: (callback: (value: T, index: number, array: T[]) => boolean) => void;
  sort: (compareFn?: (a: T, b: T) => number) => void;
}

/**
 * A simple utility hook for managing array state.
 *
 * ```tsx
 * const [items, actions] = useArray<number>([1, 2, 3]);
 * actions.push(4);
 * actions.removeIndex(0);
 * ```
 */
export function useArray<T = unknown>(
  initialArray: T[] = [],
  options: UseArrayOptions<T> = {}
): [T[], UseArrayActions<T>] {
  const { onChange, onRemoved, onAdded } = options;

  const [array, _setArray] = useState<T[]>(initialArray);

  /* -------------------------------------------------------------------------- */
  /*                                   Helpers                                  */
  /* -------------------------------------------------------------------------- */

  /**
   * Internal setter that also triggers the optional onChange callback.
   */
  const set = useCallback<UseArrayActions<T>["set"]>(
    (value) => {
      _setArray((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        onChange?.(next);
        onRemoved?.(next.length - 1);
        return next;
      });
    },
    [onChange, onRemoved]
  );

  const push = useCallback<UseArrayActions<T>["push"]>(
    (...items) => {
      _setArray((prev) => {
        const next = [...prev, ...items];
        onChange?.(next);
        onAdded?.(next.length - 1);
        return next;
      });
    },
    [onChange, onAdded]
  );

  const unshift = useCallback<UseArrayActions<T>["unshift"]>(
    (...items) => {
      _setArray((prev) => {
        const next = [...items, ...prev];
        onChange?.(next);
        onAdded?.(0);
        return next;
      });
    },
    [onChange, onAdded]
  );

  const pop = useCallback<UseArrayActions<T>["pop"]>(() => {
    let removed: T | undefined;
    _setArray((prev) => {
      const next = [...prev];
      removed = next.pop();
      onChange?.(next);
      return next;
    });
    return removed;
  }, [onChange]);

  const shift = useCallback<UseArrayActions<T>["shift"]>(() => {
    let removed: T | undefined;
    _setArray((prev) => {
      const next = [...prev];
      removed = next.shift();
      onChange?.(next);
      return next;
    });
    return removed;
  }, [onChange]);

  const clear = useCallback<UseArrayActions<T>["clear"]>(() => {
    _setArray(() => {
      onChange?.([]);
      return [];
    });
  }, [onChange]);

  const removeIndex = useCallback<UseArrayActions<T>["removeIndex"]>(
    (index) => {
      _setArray((prev) => {
        if (index < 0 || index >= prev.length) return prev;
        const next = prev.filter((_, i) => i !== index);
        onChange?.(next);
        return next;
      });
    },
    [onChange]
  );

  const updateIndex = useCallback<UseArrayActions<T>["updateIndex"]>(
    (index, newItem) => {
      _setArray((prev) => {
        if (index < 0 || index >= prev.length) return prev;
        const next = [...prev];
        next[index] = newItem;
        onChange?.(next);
        return next;
      });
    },
    [onChange]
  );

  const filter = useCallback<UseArrayActions<T>["filter"]>(
    (callback) => {
      _setArray((prev) => {
        const next = prev.filter(callback);
        onChange?.(next);
        return next;
      });
    },
    [onChange]
  );

  const sort = useCallback<UseArrayActions<T>["sort"]>(
    (compareFn) => {
      _setArray((prev) => {
        const next = [...prev].sort(compareFn);
        onChange?.(next);
        return next;
      });
    },
    [onChange]
  );

  return [array, { set, push, unshift, pop, shift, clear, removeIndex, updateIndex, filter, sort }];
}
