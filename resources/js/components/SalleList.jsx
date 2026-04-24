import React, { useState } from 'react';
import { useSalles } from '../hooks/useSalles';

export const SalleList = ({ onEdit }) => {
  const { salles, loading, error, refetch } = useSalles();
  const [localSalles, setLocalSalles] = useState([]);

  React.useEffect(() => {
    setLocalSalles(salles);
  }, [salles]);

  const handleDesactivate = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir désactiver cette salle ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/salles/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la désactivation');
      }

      setLocalSalles((prev) => prev.filter((salle) => salle.id !== id));
    } catch (err) {
      alert('Erreur : ' + err.message);
    }
  };

  if (loading) {
    return <div className="loading">Chargement des salles...</div>;
  }

  if (error) {
    return <div className="error">Erreur : {error}</div>;
  }

  if (localSalles.length === 0) {
    return (
      <div className="empty-state">
        <p>Aucune salle disponible. Commencez par en ajouter une !</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="salles-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Nom</th>
            <th>Type</th>
            <th>Capacité</th>
            <th>Bâtiment</th>
            <th>Étage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {localSalles.map((salle) => (
            <tr key={salle.id}>
              <td><strong>{salle.code}</strong></td>
              <td>{salle.nom}</td>
              <td><span className="type-badge">{salle.type || '-'}</span></td>
              <td><span className="capacity-badge">👥 {salle.capacite}</span></td>
              <td>{salle.batiment || '-'}</td>
              <td>{salle.etage || '-'}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => onEdit && onEdit(salle)}
                  style={{ marginRight: '8px' }}
                >
                  Modifier
                </button>
                <button
                  className="btn-danger"
                  onClick={() => handleDesactivate(salle.id)}
                >
                  Désactiver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
