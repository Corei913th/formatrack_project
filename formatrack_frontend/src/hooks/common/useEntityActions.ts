import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface UseEntityActionsOptions<T> {
  entityName: string;
  onEdit?: (entity: T) => void;
  onDelete?: (id: string) => Promise<any>;
  onToggleStatus?: (id: string) => Promise<any>;
}

export function useEntityActions<T extends { id: string }>({
  entityName,
  onEdit,
  onDelete,
  onToggleStatus,
}: UseEntityActionsOptions<T>) {
  const [selectedEntity, setSelectedEntity] = useState<T | null>(null);

  const handleEdit = useCallback((entity: T) => {
    setSelectedEntity(entity);
    onEdit?.(entity);
  }, [onEdit]);

  const handleDelete = useCallback(async (id: string) => {
    if (!onDelete) return;

    try {
      await onDelete(id);
      toast.success(`${entityName} supprimé avec succès`);
    } catch (_error) {
      toast.error(`Erreur lors de la suppression du ${entityName.toLowerCase()}`);
    }
  }, [onDelete, entityName]);

  const handleToggleStatus = useCallback(async (id: string) => {
    if (!onToggleStatus) return;

    try {
      await onToggleStatus(id);
      toast.success(`Statut du ${entityName.toLowerCase()} modifié avec succès`);
    } catch (_error) {
      toast.error(`Erreur lors de la modification du statut`);
    }
  }, [onToggleStatus, entityName]);

  const clearSelection = useCallback(() => {
    setSelectedEntity(null);
  }, []);

  return {
    selectedEntity,
    setSelectedEntity,
    handleEdit,
    handleDelete,
    handleToggleStatus,
    clearSelection,
  };
}
