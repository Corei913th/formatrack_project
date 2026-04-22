import { Breadcrumb } from '@/types/common.type';

import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

interface LayoutContextType {
  breadcrumb: Breadcrumb[];
  isReloading: boolean;
  updateBreadcrumb: (value: Breadcrumb[]) => void;
  updateReloadingState: (value: boolean) => void;
}

export const LayoutContext = createContext<LayoutContextType | null>(null);

interface LayoutProviderProps {
  children: ReactNode;
}

const LayoutProvider: FC<LayoutProviderProps> = ({ children }) => {
  const [breadcrumb, setBreadcrumb] = useState<Breadcrumb[]>([]);
  const [isReloading, setIsReloading] = useState<boolean>(false);

  const updateBreadcrumb = (value: Breadcrumb[]) => setBreadcrumb(value);
  const updateReloadingState = (value: boolean) => setIsReloading(value);

  const providerValue = useMemo(
    () => ({
      breadcrumb,
      isReloading,
      updateBreadcrumb,
      updateReloadingState,
    }),
    [breadcrumb, isReloading]
  );

  return (
    <LayoutContext.Provider value={providerValue}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext must be used within a LayoutProvider");
  }
  return context;
};

export default LayoutProvider;
