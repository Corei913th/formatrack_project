import { SplashScreen } from "@/components/loaders/splash-screen";
import { SpaceLayout } from "@/components/layouts/space";
import { useAuthContext } from "@/contexts/authContext";
import { Navigate } from "react-router";

export const RouteGuard = () => {
  const { isConnected, isLoadingProfile } = useAuthContext();

  if (isLoadingProfile) return <SplashScreen />;

  return !isConnected ? <Navigate to="/login" replace /> : <SpaceLayout />;
};
