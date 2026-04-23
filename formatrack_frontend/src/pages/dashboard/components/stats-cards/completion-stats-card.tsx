import React from "react";
import { StatCard } from "@/components/stat-card";
import { CheckSquare, BarChart, FileCheck, FileX } from "lucide-react";
import { CompletionStats } from '@/modules/dashboard';

interface CompletionStatsCardProps {
  data?: CompletionStats;
  isLoading?: boolean;
}

export const CompletionStatsCard = React.memo(({ data, isLoading = false }: CompletionStatsCardProps) => {
  if (isLoading || !data) {
    return (
      <>
        <StatCard
          title="Taux de Complétion"
          value="..."
          icon={BarChart}
          description="Chargement..."
        />
        <StatCard
          title="Dossiers Complets"
          value="..."
          icon={FileCheck}
          description="Chargement..."
        />
        <StatCard
          title="Dossiers Incomplets"
          value="..."
          icon={FileX}
          description="Chargement..."
        />
        <StatCard
          title="Total Dossiers"
          value="..."
          icon={CheckSquare}
          description="Chargement..."
        />
      </>
    );
  }

  // Format completion rate as percentage
  const completionRate = `${data.taux_completion.toFixed(1)}%`;

  return (
    <>
      <StatCard
        title="Taux de Complétion"
        value={completionRate}
        icon={BarChart}
        description={`${data.dossiers_complets} complets sur ${data.total_dossiers} dossiers`}
      />
      <StatCard
        title="Dossiers Complets"
        value={data.dossiers_complets}
        icon={FileCheck}
        description={`${data.taux_completion.toFixed(1)}% du total des dossiers`}
      />
      <StatCard
        title="Dossiers Incomplets"
        value={data.dossiers_incomplets}
        icon={FileX}
        description={`${(100 - data.taux_completion).toFixed(1)}% nécessitent des actions`}
      />
      <StatCard
        title="Total Dossiers"
        value={data.total_dossiers}
        icon={CheckSquare}
        description={`${data.dossiers_complets} complets, ${data.dossiers_incomplets} incomplets`}
      />
    </>
  );
});

CompletionStatsCard.displayName = 'CompletionStatsCard';
