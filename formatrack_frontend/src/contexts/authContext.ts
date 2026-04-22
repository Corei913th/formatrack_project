import { User } from '@/modules/users';
import { createContext, useContext } from "react";


interface IAuthContext {
  user: User | null;
  isConnected: boolean;
  isLoadingProfile: boolean;
  updateUser: (user: User | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
