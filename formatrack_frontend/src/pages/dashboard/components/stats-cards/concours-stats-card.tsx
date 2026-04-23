import React from "react";
import { StatCard } from "@/components/stat-card";
import { Trophy, Calendar, Archive, ClipboardList } from "lucide-react";
import { ConcoursStats } from '@/modules/dashboard';

interface ConcoursStatsCardProps {
  data?: ConcoursStats;
  isLoading?: boolean;
}

export const ConcoursStatsCard = React.memo(({ data, isLoading = false }: ConcoursStatsCardProps) => {
  if (isLoading || !data) {
    return (
      <>
        <StatCard
          title="Total Concours"
          value="..."
          icon={Trophy}
          description="Chargement..."
        />
        <StatCard
          title="Concours Ouverts"
          value="..."
          icon={Calendar}
          description="Chargement..."
        />
        <StatCard
          title="Concours Fermés"
          value="..."
          icon={Archive}
          description="Chargement..."
        />
        <StatCard
          title="En Préparation"
          value="..."
          icon={ClipboardList}
          description="Chargement..."
        />
      </>
    );
  }

  const openPercentage = data.total > 0
    ? Math.round((data.ouverts / data.total) * 100)
    : 0;

  return (
    <>
      <StatCard
        title="Total Concours"
        value={data.total}
        icon={Trophy}
        description={`${data.ouverts} ouverts, ${data.fermes} fermés, ${data.en_preparation} en préparation`}
      />
      <StatCard
        title="Concours Ouverts"
        value={data.ouverts}
        icon={Calendar}
        description={`${openPercentage}% des concours sont actuellement ouverts`}
      />
      <StatCard
        title="Concours Fermés"
        value={data.fermes}
        icon={Archive}
        description="Inscriptions terminées"
      />
      <StatCard
        title="En Préparation"
        value={data.en_preparation}
        icon={ClipboardList}
        description="Concours à venir"
      />
    </>
  );
});

ConcoursStatsCard.displayName = 'ConcoursStatsCard';
