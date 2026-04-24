import React from 'react';
import { useSalles } from '../hooks/useSalles';

export const Dashboard = () => {
  const { salles, loading } = useSalles();

  if (loading) {
    return <div className="loading">Chargement des statistiques...</div>;
  }

  // Calcul des statistiques
  const totalSalles = salles.length;
  const capaciteTotale = salles.reduce((sum, salle) => sum + (salle.capacite || 0), 0);
  const capaciteMoyenne = totalSalles > 0 ? Math.round(capaciteTotale / totalSalles) : 0;
  
  // Grouper par type
  const sallesParType = salles.reduce((acc, salle) => {
    const type = salle.type || 'Non spécifié';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  // Grouper par bâtiment
  const sallesParBatiment = salles.reduce((acc, salle) => {
    const batiment = salle.batiment || 'Non spécifié';
    acc[batiment] = (acc[batiment] || 0) + 1;
    return acc;
  }, {});

  // Top 5 salles par capacité
  const topSalles = [...salles]
    .sort((a, b) => (b.capacite || 0) - (a.capacite || 0))
    .slice(0, 5);

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">📊 Tableau de Bord</h2>
      
      {/* Cartes de statistiques */}
      <div className="stats-grid">
        <div className="stat-card stat-card-primary">
          <div className="stat-icon">🏢</div>
          <div className="stat-content">
            <div className="stat-value">{totalSalles}</div>
            <div className="stat-label">Salles Actives</div>
          </div>
        </div>

        <div className="stat-card stat-card-success">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-value">{capaciteTotale}</div>
            <div className="stat-label">Capacité Totale</div>
          </div>
        </div>

        <div className="stat-card stat-card-info">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-value">{capaciteMoyenne}</div>
            <div className="stat-label">Capacité Moyenne</div>
          </div>
        </div>

        <div className="stat-card stat-card-warning">
          <div className="stat-icon">🏗️</div>
          <div className="stat-content">
            <div className="stat-value">{Object.keys(sallesParBatiment).length}</div>
            <div className="stat-label">Bâtiments</div>
          </div>
        </div>
      </div>

      {/* Graphiques et détails */}
      <div className="dashboard-grid">
        {/* Répartition par type */}
        <div className="dashboard-card">
          <h3 className="card-title">📋 Répartition par Type</h3>
          <div className="chart-container">
            {Object.entries(sallesParType).length > 0 ? (
              <div className="bar-chart">
                {Object.entries(sallesParType).map(([type, count]) => (
                  <div key={type} className="bar-item">
                    <div className="bar-label">{type}</div>
                    <div className="bar-wrapper">
                      <div 
                        className="bar-fill" 
                        style={{ width: `${(count / totalSalles) * 100}%` }}
                      >
                        <span className="bar-value">{count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">Aucune donnée disponible</p>
            )}
          </div>
        </div>

        {/* Répartition par bâtiment */}
        <div className="dashboard-card">
          <h3 className="card-title">🏢 Répartition par Bâtiment</h3>
          <div className="chart-container">
            {Object.entries(sallesParBatiment).length > 0 ? (
              <div className="bar-chart">
                {Object.entries(sallesParBatiment).map(([batiment, count]) => (
                  <div key={batiment} className="bar-item">
                    <div className="bar-label">{batiment}</div>
                    <div className="bar-wrapper">
                      <div 
                        className="bar-fill bar-fill-secondary" 
                        style={{ width: `${(count / totalSalles) * 100}%` }}
                      >
                        <span className="bar-value">{count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-state">Aucune donnée disponible</p>
            )}
          </div>
        </div>

        {/* Top 5 salles */}
        <div className="dashboard-card dashboard-card-full">
          <h3 className="card-title">🏆 Top 5 - Plus Grandes Salles</h3>
          <div className="table-container">
            {topSalles.length > 0 ? (
              <table className="top-table">
                <thead>
                  <tr>
                    <th>Rang</th>
                    <th>Code</th>
                    <th>Nom</th>
                    <th>Type</th>
                    <th>Bâtiment</th>
                    <th>Capacité</th>
                  </tr>
                </thead>
                <tbody>
                  {topSalles.map((salle, index) => (
                    <tr key={salle.id}>
                      <td className="rank-cell">
                        <span className={`rank-badge rank-${index + 1}`}>
                          {index + 1}
                        </span>
                      </td>
                      <td><strong>{salle.code}</strong></td>
                      <td>{salle.nom}</td>
                      <td><span className="type-badge">{salle.type || '-'}</span></td>
                      <td>{salle.batiment || '-'}</td>
                      <td>
                        <span className="capacity-badge">
                          👥 {salle.capacite}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="empty-state">Aucune salle disponible</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
