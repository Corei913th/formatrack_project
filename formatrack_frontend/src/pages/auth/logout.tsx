import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/authContext";
import { SplashScreen } from "@/components/loaders/splash-screen";

export default function Logout() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1000);

    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <SplashScreen />
        <p className="mt-4 text-muted-foreground">Déconnexion en cours...</p>
      </div>
    </div>
  );
}