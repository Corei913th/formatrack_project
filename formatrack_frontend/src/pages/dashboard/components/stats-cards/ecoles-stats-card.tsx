import React from "react";
import { StatCard } from "@/components/stat-card";
import { Building2, CheckCircle, XCircle } from "lucide-react";
import { EcolesStats } from '@/modules/dashboard';

interface EcolesStatsCardProps {
  data: EcolesStats;
  isLoading?: boolean;
}

export const EcolesStatsCard = React.memo(({ data, isLoading = false }: EcolesStatsCardProps) => {
  if (isLoading) {
    return (
      <>
        <StatCard
          title="Total Écoles"
          value="..."
          icon={Building2}
          description="Chargement..."
        />
        <StatCard
          title="Écoles Actives"
          value="..."
          icon={CheckCircle}
          description="Chargement..."
        />
        <StatCard
          title="Écoles Inactives"
          value="..."
          icon={XCircle}
          description="Chargement..."
        />
      </>
    );
  }

  const activePercentage = data.total > 0
    ? Math.round((data.actives / data.total) * 100)
    : 0;

  return (
    <>
      <StatCard
        title="Total Écoles"
        value={data.total}
        icon={Building2}
        description={`${data.actives} actives, ${data.inactives} inactives`}
      />
      <StatCard
        title="Écoles Actives"
        value={data.actives}
        icon={CheckCircle}
        description={`${activePercentage}% du total des écoles`}
      />
      <StatCard
        title="Écoles Inactives"
        value={data.inactives}
        icon={XCircle}
        description={`${100 - activePercentage}% du total des écoles`}
      />
    </>
  );
});

EcolesStatsCard.displayName = 'EcolesStatsCard';
