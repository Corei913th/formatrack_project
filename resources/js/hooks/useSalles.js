import { useState, useEffect } from 'react';

export const useSalles = () => {
  const [salles, setSalles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSalles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/salles');
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des salles');
      }
      
      const data = await response.json();
      setSalles(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalles();
  }, []);

  return { salles, loading, error, refetch: fetchSalles };
};
