import React, { useState, useEffect } from 'react';
import { Clock, Calendar, AlertTriangle, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Echeance } from '@/modules/dashboard';
import { useDeadlinesData } from '@/modules/dashboard/hooks/useDeadlinesData';

interface DeadlinesPanelProps {
  data: Echeance[];
  isLoading: boolean;
}

const DeadlinesPanel: React.FC<DeadlinesPanelProps> = React.memo(({ data, isLoading }) => {
  const { urgentCount, warningCount, total } = useDeadlinesData({ data });

  // Update component every minute for live countdown
  const [, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Prochaines Échéances</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <div className="animate-pulse">Chargement des échéances...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getUrgencyVariant = (heuresRestantes: number) => {
    if (heuresRestantes <= 24) return 'destructive' as const;
    if (heuresRestantes <= 72) return 'warning' as const;
    return 'secondary' as const;
  };

  const getUrgencyIndicator = (heuresRestantes: number) => {
    if (heuresRestantes <= 24) {
      return { icon: AlertTriangle, color: 'text-destructive', pulse: true };
    }
    if (heuresRestantes <= 72) {
      return { icon: Clock, color: 'text-warning', pulse: false };
    }
    return { icon: Calendar, color: 'text-muted-foreground', pulse: false };
  };

  const formatTimeRemaining = (heures: number) => {
    if (heures < 1) {
      return 'Moins d\'1h';
    }
    if (heures < 24) {
      return `${Math.floor(heures)}h restantes`;
    }
    const jours = Math.floor(heures / 24);
    const heuresRestantes = Math.floor(heures % 24);
    if (heuresRestantes === 0) {
      return `${jours}j restant${jours > 1 ? 's' : ''}`;
    }
    return `${jours}j ${heuresRestantes}h`;
  };

  const formatDetailedTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleNavigateToConcours = (concoursId: string) => {
    // Navigate to concours management page
    window.location.href = `/concours/${concoursId}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Prochaines Échéances
          {total > 0 && (
            <div className="flex items-center gap-1">
              {urgentCount > 0 && (
                <Badge variant="destructive" size="sm" className="animate-pulse">
                  {urgentCount} urgent{urgentCount > 1 ? 's' : ''}
                </Badge>
              )}
              {warningCount > 0 && (
                <Badge variant="warning" size="sm">
                  {warningCount}
                </Badge>
              )}
              {urgentCount === 0 && warningCount === 0 && (
                <Badge variant="outline" size="sm">
                  {total}
                </Badge>
              )}
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <Alert>
            <CheckCircle2 className="h-4 w-4 text-success" />
            <AlertDescription>
              Aucune échéance dans les 7 prochains jours. Vous êtes à jour!
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-3">
            {data.map((echeance) => {
              const urgency = getUrgencyIndicator(echeance.heures_restantes);
              const UrgencyIcon = urgency.icon;

              return (
                <div
                  key={echeance.concours_id}
                  className={`flex items-start justify-between p-3 border rounded-lg transition-colors hover:bg-accent/50 ${echeance.heures_restantes <= 24 ? 'border-destructive/50 bg-destructive/5' : ''
                    }`}
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start gap-2">
                      <UrgencyIcon
                        className={`h-4 w-4 mt-0.5 ${urgency.color} ${urgency.pulse ? 'animate-pulse' : ''}`}
                      />
                      <div className="flex-1">
                        <div className="font-medium">{echeance.libelle_concours}</div>
                        {echeance.ecole && (
                          <div className="text-sm text-muted-foreground">
                            École: {echeance.ecole}
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground mt-1">
                          Fermeture: {formatDetailedTime(echeance.date_cloture)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-4">
                    <Badge
                      variant={getUrgencyVariant(echeance.heures_restantes)}
                      className={`${echeance.heures_restantes <= 24 ? 'animate-pulse' : ''} whitespace-nowrap`}
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTimeRemaining(echeance.heures_restantes)}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => handleNavigateToConcours(echeance.concours_id)}
                    >
                      Gérer
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
});

DeadlinesPanel.displayName = 'DeadlinesPanel';

export default DeadlinesPanel;