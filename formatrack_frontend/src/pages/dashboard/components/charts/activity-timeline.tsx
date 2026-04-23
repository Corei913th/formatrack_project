import React, { useState } from 'react';
import { Clock, UserCheck, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ActiviteRecente } from '@/modules/dashboard';
import { formatDateTime } from '@/utils/date';

interface ActivityTimelineProps {
  activities: ActiviteRecente[];
  isLoading?: boolean;
  itemsPerPage?: number;
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = React.memo(({
  activities,
  isLoading = false,
  itemsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Activité Récente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-muted-foreground">Chargement de l'activité récente...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Handle empty state
  if (!activities || activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Activité Récente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-muted-foreground">Aucune activité récente</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Pagination logic
  const totalPages = Math.ceil(activities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivities = activities.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Get icon and color based on activity type
  const getActivityIcon = (type: ActiviteRecente['type']) => {
    switch (type) {
      case 'inscription':
        return <UserCheck className="h-4 w-4" />;
      case 'validation_paiement':
        return <CreditCard className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: ActiviteRecente['type']) => {
    switch (type) {
      case 'inscription':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'validation_paiement':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      default:
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
    }
  };

  const getActivityLabel = (type: ActiviteRecente['type']) => {
    switch (type) {
      case 'inscription':
        return 'Inscription';
      case 'validation_paiement':
        return 'Paiement validé';
      default:
        return type;
    }
  };

  // Format montant in XAF
  const formatMontant = (montant?: number) => {
    if (!montant) return null;
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(montant);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Activité Récente
          </div>
          <Badge variant="outline">
            {activities.length} activité{activities.length > 1 ? 's' : ''}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Timeline */}
          <div className="relative space-y-4">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

            {currentActivities.map((activity, index) => (
              <div key={`${activity.date}-${index}`} className="relative flex gap-4">
                {/* Icon */}
                <div
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background ${getActivityColor(
                    activity.type
                  )}`}
                >
                  {getActivityIcon(activity.type)}
                </div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {getActivityLabel(activity.type)}
                      </Badge>
                      {activity.montant && (
                        <Badge variant="outline" className="text-xs font-semibold">
                          {formatMontant(activity.montant)}
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDateTime(activity.date)}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm">
                      <span className="font-medium">{activity.candidat}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {activity.concours}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} sur {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Précédent
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Suivant
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t">
            <div>
              <div className="font-medium">Inscriptions</div>
              <div className="text-muted-foreground">
                {activities.filter((a) => a.type === 'inscription').length}
              </div>
            </div>
            <div>
              <div className="font-medium">Paiements validés</div>
              <div className="text-muted-foreground">
                {activities.filter((a) => a.type === 'validation_paiement').length}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

ActivityTimeline.displayName = 'ActivityTimeline';

export default ActivityTimeline;
