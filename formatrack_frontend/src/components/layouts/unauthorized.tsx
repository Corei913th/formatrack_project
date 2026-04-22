import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-red-600">403</h1>
        <h2 className="text-2xl font-semibold">Accès non autorisé</h2>
        <p className="text-muted-foreground max-w-md">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          Veuillez contacter votre administrateur si vous pensez qu'il s'agit d'une erreur.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Retour
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;