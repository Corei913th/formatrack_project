import React, { useState, useEffect } from 'react';

export const SalleForm = ({ salleToEdit, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    code: '',
    nom: '',
    type: '',
    capacite: '',
    equipements: '',
    batiment: '',
    etage: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const isEditing = !!salleToEdit;

  useEffect(() => {
    if (salleToEdit) {
      setFormData({
        code: salleToEdit.code || '',
        nom: salleToEdit.nom || '',
        type: salleToEdit.type || '',
        capacite: salleToEdit.capacite || '',
        equipements: salleToEdit.equipements || '',
        batiment: salleToEdit.batiment || '',
        etage: salleToEdit.etage || '',
      });
    } else {
      setFormData({
        code: '',
        nom: '',
        type: '',
        capacite: '',
        equipements: '',
        batiment: '',
        etage: '',
      });
    }
    setErrors({});
  }, [salleToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    try {
      const url = isEditing ? `/api/salles/${salleToEdit.id}` : '/api/salles';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 422) {
          const data = await response.json();
          setErrors(data.errors || {});
        } else {
          throw new Error(`Erreur lors de ${isEditing ? 'la modification' : 'la création'} de la salle`);
        }
        return;
      }

      setFormData({
        code: '',
        nom: '',
        type: '',
        capacite: '',
        equipements: '',
        batiment: '',
        etage: '',
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="code">Code *</label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Ex: A101"
            required
          />
          {errors.code && <span className="error">{errors.code[0]}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="nom">Nom *</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Ex: Salle de cours A101"
            required
          />
          {errors.nom && <span className="error">{errors.nom[0]}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">Sélectionner un type</option>
            <option value="Cours">Cours</option>
            <option value="TP">TP</option>
            <option value="TD">TD</option>
            <option value="Amphithéâtre">Amphithéâtre</option>
            <option value="Laboratoire">Laboratoire</option>
            <option value="Conférence">Conférence</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="capacite">Capacité *</label>
          <input
            type="number"
            id="capacite"
            name="capacite"
            value={formData.capacite}
            onChange={handleChange}
            min="1"
            placeholder="Ex: 30"
            required
          />
          {errors.capacite && <span className="error">{errors.capacite[0]}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="batiment">Bâtiment</label>
          <input
            type="text"
            id="batiment"
            name="batiment"
            value={formData.batiment}
            onChange={handleChange}
            placeholder="Ex: Bâtiment A"
          />
        </div>

        <div className="form-group">
          <label htmlFor="etage">Étage</label>
          <input
            type="number"
            id="etage"
            name="etage"
            value={formData.etage}
            onChange={handleChange}
            placeholder="Ex: 1"
          />
        </div>

        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="equipements">Équipements</label>
          <input
            type="text"
            id="equipements"
            name="equipements"
            value={formData.equipements}
            onChange={handleChange}
            placeholder="Ex: Projecteur, Tableau blanc, Ordinateur"
          />
        </div>
      </div>

      {errors.general && <div className="error" style={{ marginBottom: '15px' }}>{errors.general}</div>}

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting
            ? (isEditing ? '⏳ Modification en cours...' : '⏳ Création en cours...')
            : (isEditing ? '✅ Enregistrer les modifications' : '✅ Créer la salle')}
        </button>
        {isEditing && onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            ❌ Annuler
          </button>
        )}
      </div>
    </form>
  );
};
