import { FC, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { AuthContext } from "@/contexts/authContext";
import { authService } from '@/modules/auth';
import { extractUserFromAccessToken } from "@/utils/jwt";
import { useGetProfile } from '@/modules/auth'
import { useRefreshToken } from '@/modules/auth';
import { User } from '@/modules/users';
import { installAuthInterceptor } from "@/interceptors/auth.interceptor";


interface Props {
  children: ReactNode;
}

const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { mutateAsync: refreshToken } = useRefreshToken();
  const refreshRef = useRef(refreshToken);

  useEffect(() => {
    refreshRef.current = refreshToken;
  }, [refreshToken]);



  const { data: profile, isLoading } = useGetProfile(
    Boolean(authService.getAccessToken())
  );

  // Installer l'interceptor UNE SEULE FOIS
  useEffect(() => {
    installAuthInterceptor(async () => {
      const token = await refreshRef.current();
      if (!token) logout();
      return token;
    });
  }, [refreshToken]);

  useEffect(() => {
    authService.scheduleProactiveRefresh(async () => {
      const token = await refreshRef.current();
      if (!token) logout();
      return token;
    });
  }, []);


  // Charger user depuis l'accessToken au montage et à chaque changement de token
  useEffect(() => {
    const token = authService.getAccessToken();
    if (!token) {
      setUser(null);
      return;
    }

    const decoded = extractUserFromAccessToken(token);
    if (decoded) {
      setUser(decoded as User);
    }

    // rafraîchissement proactif toutes les X minutes
    authService.scheduleProactiveRefresh(() => refreshRef.current());
  }, [refreshToken]);

  // Écouter les changements de localStorage pour mettre à jour l'utilisateur
  useEffect(() => {
    const handleStorageChange = (event: CustomEvent) => {
      const { key } = event.detail;
      // Vérifier si c'est le token d'accès qui a changé
      if (key.includes('auth-token')) {
        const token = authService.getAccessToken();
        if (token) {
          const decoded = extractUserFromAccessToken(token);
          if (decoded) {
            setUser(decoded as User);
          }
        } else {
          setUser(null);
        }
      }
    };

    // Écouter les changements de localStorage
    window.addEventListener('localStorageChange', handleStorageChange as EventListener);

    return () => {
      window.removeEventListener('localStorageChange', handleStorageChange as EventListener);
    };
  }, []);


  useEffect(() => {
    if (profile?.data) {
      setUser(profile.data);
    }
  }, [profile]);

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.warn("Logout service failed:", error);
    } finally {
      setUser(null);
    }
  };

  const updateUser = (user: User | null) => {
    setUser(user);
  };

  const value = useMemo(
    () => ({
      user,
      isConnected: Boolean(user) || Boolean(authService.getAccessToken()),
      isLoadingProfile: isLoading,
      logout,
      updateUser,
    }),
    [user, isLoading]
  );

  return (
    <AuthContext.Provider value={value} >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
