import React, { useState } from 'react';
import { RefreshCw, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/utils/common';

interface RefreshControlsProps {
  onRefresh: () => Promise<void>;
  lastUpdated: string | null;
  isRefreshing?: boolean;
  className?: string;
  autoRefreshEnabled?: boolean;
  onToggleAutoRefresh?: (enabled: boolean) => void;
}

/**
 * Refresh Controls Component
 * Provides manual refresh button with loading states and last update timestamp
 * Includes pause/resume controls for auto-refresh
 */
export const RefreshControls: React.FC<RefreshControlsProps> = ({
  onRefresh,
  lastUpdated,
  isRefreshing = false,
  className,
  autoRefreshEnabled = true,
  onToggleAutoRefresh,
}) => {
  const [isAutoRefreshPaused, setIsAutoRefreshPaused] = useState(!autoRefreshEnabled);

  const handleManualRefresh = async () => {
    try {
      await onRefresh();
      toast.success('Données actualisées', {
        description: 'Les statistiques ont été mises à jour avec succès.',
      });
    } catch (_error) {
      toast.error('Erreur', {
        description: 'Impossible de rafraîchir les données.',
      });
    }
  };

  const toggleAutoRefresh = () => {
    const newState = !isAutoRefreshPaused;
    setIsAutoRefreshPaused(newState);

    if (onToggleAutoRefresh) {
      onToggleAutoRefresh(!newState);
    }

    toast.info(
      newState ? 'Auto-refresh en pause' : 'Auto-refresh activé',
      {
        description: newState
          ? 'L\'actualisation automatique est en pause.'
          : 'Les données seront actualisées automatiquement toutes les 5 minutes.',
      }
    );
  };

  return (
    <div className={cn('flex items-center gap-3', className)} role="group" aria-label="Contrôles de rafraîchissement">
      {/* Last Update Timestamp */}
      {lastUpdated && (
        <div className="text-sm text-muted-foreground" role="status" aria-live="polite">
          Dernière mise à jour: <span className="font-medium">{lastUpdated}</span>
        </div>
      )}

      {/* Manual Refresh Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleManualRefresh}
        disabled={isRefreshing}
        className="gap-2"
        aria-label={isRefreshing ? 'Actualisation en cours' : 'Actualiser les données'}
      >
        <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} aria-hidden="true" />
        Actualiser
      </Button>

      {/* Auto-Refresh Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleAutoRefresh}
        className="gap-2"
        aria-label={isAutoRefreshPaused ? 'Reprendre l\'actualisation automatique' : 'Mettre en pause l\'actualisation automatique'}
        aria-pressed={!isAutoRefreshPaused}
      >
        {isAutoRefreshPaused ? (
          <>
            <Play className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Reprendre</span>
          </>
        ) : (
          <>
            <Pause className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Pause</span>
          </>
        )}
      </Button>
    </div>
  );
};
