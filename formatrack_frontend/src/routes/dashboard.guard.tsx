import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/contexts/authContext';


interface DashboardGuardProps {
  children: React.ReactNode;
}

export const DashboardGuard: React.FC<DashboardGuardProps> = ({
  children,
}) => {
  const { user, isConnected, isLoadingProfile } = useAuthContext();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoadingProfile) {
    return (
      <div role="status" aria-live="polite" className="flex items-center justify-center p-6">
        <span className="sr-only">Vérification de l'authentification...</span>
        <div>Chargement...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isConnected || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


  return <>{children}</>;
};

