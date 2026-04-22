import React from 'react';
import { LucideIcon, CheckCircle, XCircle } from 'lucide-react';
import { StatCard } from '@/components/stat-card';
import { StaggerContainer } from '@/components/animate/stagger-container';

interface EntityStatsGridProps {
  total: number;
  actifs: number;
  inactifs: number;
  entityName: string;
  icon: LucideIcon;
  totalLabel?: string;
  actifsLabel?: string;
  inactifsLabel?: string;
}

export const EntityStatsGrid = React.memo<EntityStatsGridProps>(({
  total,
  actifs,
  inactifs,
  entityName,
  icon: Icon,
  totalLabel,
  actifsLabel,
  inactifsLabel,
}) => {
  return (
    <StaggerContainer className="grid gap-4 md:grid-cols-3" staggerDelay={0.1}>
      <StatCard
        title={totalLabel || `Total ${entityName}`}
        value={total}
        icon={Icon}
        description={`Nombre total de ${entityName.toLowerCase()}`}
      />
      <StatCard
        title={actifsLabel || `${entityName} Actifs`}
        value={actifs}
        icon={CheckCircle}
        description={`${entityName} actuellement actifs`}
      />
      <StatCard
        title={inactifsLabel || `${entityName} Inactifs`}
        value={inactifs}
        icon={XCircle}
        description={`${entityName} actuellement inactifs`}
      />
    </StaggerContainer>
  );
});

EntityStatsGrid.displayName = 'EntityStatsGrid';
