import React from "react";
import { StatCard } from "@/components/stat-card";
import { Users, FileText, UserCheck } from "lucide-react";
import { CandidatsStats } from '@/modules/dashboard';

interface CandidatsStatsCardProps {
  data?: CandidatsStats | Pick<CandidatsStats, 'total_candidatures' | 'candidats_uniques'>;
  isLoading?: boolean;
}

export const CandidatsStatsCard = React.memo(({ data, isLoading = false }: CandidatsStatsCardProps) => {
  if (isLoading || !data) {
    return (
      <>
        <StatCard
          title="Total Candidats"
          value="..."
          icon={Users}
          description="Chargement..."
        />
        <StatCard
          title="Candidats Actifs"
          value="..."
          icon={UserCheck}
          description="Chargement..."
        />
        <StatCard
          title="Total Candidatures"
          value="..."
          icon={FileText}
          description="Chargement..."
        />
      </>
    );
  }

  // Handle both full CandidatsStats and école-specific partial stats
  const total = 'total' in data ? data.total : 0;
  const actifs = 'actifs' in data ? data.actifs : 0;
  const totalCandidatures = data.total_candidatures || 0;

  // Calculate conversion rate (candidatures per candidat)
  const conversionRate = total > 0
    ? (totalCandidatures / total).toFixed(2)
    : "0.00";

  const activePercentage = total > 0
    ? Math.round((actifs / total) * 100)
    : 0;

  return (
    <>
      {total > 0 && (
        <StatCard
          title="Total Candidats"
          value={total}
          icon={Users}
          description={`${actifs} actifs (${activePercentage}%)`}
        />
      )}
      {actifs > 0 && (
        <StatCard
          title="Candidats Actifs"
          value={actifs}
          icon={UserCheck}
          description={`${activePercentage}% des candidats inscrits`}
        />
      )}
      <StatCard
        title="Total Candidatures"
        value={totalCandidatures}
        icon={FileText}
        description={total > 0 ? `Moyenne de ${conversionRate} candidatures par candidat` : 'Candidatures enregistrées'}
      />
    </>
  );
});

CandidatsStatsCard.displayName = 'CandidatsStatsCard';
