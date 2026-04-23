import React from "react";
import { StatCard } from "@/components/stat-card";
import { DollarSign, CreditCard, Clock, CheckCircle2 } from "lucide-react";
import { FinancierStats } from '@/modules/dashboard';

interface FinancialStatsCardProps {
  data?: FinancierStats;
  isLoading?: boolean;
}

/**
 * Format amount in XAF currency
 * @param amount - Amount to format
 * @returns Formatted string with XAF currency
 */
const formatXAF = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const FinancialStatsCard = React.memo(({ data, isLoading = false }: FinancialStatsCardProps) => {
  if (isLoading || !data) {
    return (
      <>
        <StatCard
          title="Montant Total Collecté"
          value="..."
          icon={DollarSign}
          description="Chargement..."
        />
        <StatCard
          title="Paiements Validés"
          value="..."
          icon={CheckCircle2}
          description="Chargement..."
        />
        <StatCard
          title="Paiements en Attente"
          value="..."
          icon={Clock}
          description="Chargement..."
        />
        <StatCard
          title="Montant en Attente"
          value="..."
          icon={CreditCard}
          description="Chargement..."
        />
      </>
    );
  }

  const totalPayments = data.nombre_paiements_valides + data.paiements_en_attente;
  const validatedPercentage = totalPayments > 0
    ? Math.round((data.nombre_paiements_valides / totalPayments) * 100)
    : 0;

  return (
    <>
      <StatCard
        title="Montant Total Collecté"
        value={formatXAF(data.montant_total_collecte)}
        icon={DollarSign}
        description={`${data.nombre_paiements_valides} paiements validés`}
      />
      <StatCard
        title="Paiements Validés"
        value={data.nombre_paiements_valides}
        icon={CheckCircle2}
        description={`${validatedPercentage}% des paiements totaux`}
      />
      <StatCard
        title="Paiements en Attente"
        value={data.paiements_en_attente}
        icon={Clock}
        description={`${100 - validatedPercentage}% en attente de validation`}
      />
      <StatCard
        title="Montant en Attente"
        value={formatXAF(data.montant_en_attente)}
        icon={CreditCard}
        description={`${data.paiements_en_attente} paiements à valider`}
      />
    </>
  );
});

FinancialStatsCard.displayName = 'FinancialStatsCard';
