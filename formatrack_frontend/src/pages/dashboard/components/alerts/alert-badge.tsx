import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertBadgeProps } from '@/modules/dashboard';

const AlertBadge: React.FC<AlertBadgeProps> = ({ count, type, severity }) => {
  const getVariant = () => {
    switch (severity) {
      case 'high': return 'destructive' as const;
      case 'medium': return 'warning' as const;
      case 'low': return 'secondary' as const;
      default: return 'default' as const;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'payment': return 'Paiements';
      case 'document': return 'Documents';
      case 'completion': return 'Complétion';
      default: return 'Alerte';
    }
  };

  const getTooltipText = () => {
    switch (type) {
      case 'payment':
        return `${count} paiement${count > 1 ? 's' : ''} en attente de validation`;
      case 'document':
        return `${count} document${count > 1 ? 's' : ''} à valider`;
      case 'completion':
        return `${count} dossier${count > 1 ? 's' : ''} incomplet${count > 1 ? 's' : ''}`;
      default:
        return `${count} alerte${count > 1 ? 's' : ''}`;
    }
  };

  const getPulseClass = () => {
    if (severity === 'high') {
      return 'animate-pulse';
    }
    return '';
  };

  if (count === 0) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge
          variant={getVariant()}
          className={`flex items-center gap-1 cursor-help ${getPulseClass()}`}
        >
          <span>{getTypeLabel()}</span>
          <span className="font-bold">{count}</span>
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>{getTooltipText()}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default AlertBadge;