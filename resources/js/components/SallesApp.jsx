import React, { useState } from 'react';
import { Dashboard } from './Dashboard';
import { SalleList } from './SalleList';
import { SalleForm } from './SalleForm';

export const SallesApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [editingSalle, setEditingSalle] = useState(null);

  const handleFormSuccess = () => {
    setRefreshKey((prev) => prev + 1);
    setEditingSalle(null);
  };

  const handleEdit = (salle) => {
    setEditingSalle(salle);
    setActiveTab('create');
  };

  const handleCancelEdit = () => {
    setEditingSalle(null);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <div className="app-header">
        <h1 className="app-title">🏢 Gestion des Salles</h1>
        <p className="app-subtitle">Système de gestion et de suivi des salles</p>
      </div>

      {/* Navigation */}
      <div className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Tableau de Bord
        </button>
        <button
          className={`nav-tab ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          📋 Liste des Salles
        </button>
        <button
          className={`nav-tab ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => {
            setEditingSalle(null);
            setActiveTab('create');
          }}
        >
          ➕ {editingSalle ? 'Modifier la Salle' : 'Ajouter une Salle'}
        </button>
      </div>

      {/* Content */}
      {activeTab === 'dashboard' && (
        <Dashboard key={refreshKey} />
      )}

      {activeTab === 'list' && (
        <div className="list-section">
          <h2 className="list-title">📋 Liste des Salles</h2>
          <SalleList key={refreshKey} onEdit={handleEdit} />
        </div>
      )}

      {activeTab === 'create' && (
        <div className="form-section">
          <h2 className="form-title">
            {editingSalle ? '✏️ Modifier la Salle' : '➕ Ajouter une Nouvelle Salle'}
          </h2>
          <SalleForm
            salleToEdit={editingSalle}
            onCancel={editingSalle ? handleCancelEdit : null}
            onSuccess={() => {
              handleFormSuccess();
              setActiveTab('list');
            }}
          />
        </div>
      )}
    </div>
  );
};
