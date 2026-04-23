import React from 'react';
import { AlertTriangle, FileText, CreditCard, CheckCircle2, ExternalLink } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertesData } from '@/modules/dashboard';
import { useAlertsData } from '@/modules/dashboard/hooks/useAlertsData';

interface AlertsPanelProps {
  data: AlertesData;
  isLoading: boolean;
  onDismiss?: (alertType: string) => void;
}

const AlertsPanel: React.FC<AlertsPanelProps> = React.memo(({ data, isLoading, onDismiss }) => {
  const { alerts, hasAlerts, totalAlerts, highSeverityCount, activeAlerts } = useAlertsData({ data });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Alertes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <div className="animate-pulse">Chargement des alertes...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Map icons to alerts
  const alertsWithIcons = alerts.map(alert => ({
    ...alert,
    icon: alert.type === 'payment' ? CreditCard : alert.type === 'document' ? FileText : AlertTriangle,
  }));

  const getAlertBadgeVariant = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high': return 'destructive' as const;
      case 'medium': return 'warning' as const;
      case 'low': return 'secondary' as const;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Alertes
          {hasAlerts && (
            <Badge
              variant={highSeverityCount > 0 ? 'destructive' : 'warning'}
              size="sm"
              className={highSeverityCount > 0 ? 'animate-pulse' : ''}
            >
              {totalAlerts}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!hasAlerts ? (
          <Alert>
            <CheckCircle2 className="h-4 w-4 text-success" />
            <AlertTitle>Aucune alerte</AlertTitle>
            <AlertDescription>
              Tous les éléments sont à jour. Excellent travail!
            </AlertDescription>
          </Alert>
        ) : (
          activeAlerts.map((alertData) => {
            const alert = alertsWithIcons.find(a => a.type === alertData.type)!;
            return (
              <Alert key={alert.type} variant={alert.variant}>
                <alert.icon className="h-4 w-4" />
                <AlertTitle className="flex items-center gap-2">
                  {alert.title}
                  <Badge
                    variant={getAlertBadgeVariant(alert.severity)}
                    size="sm"
                    className={alert.severity === 'high' ? 'animate-pulse' : ''}
                  >
                    {alert.count}
                  </Badge>
                </AlertTitle>
                <AlertDescription>
                  <div className="space-y-2">
                    <p>{alert.description}</p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => {
                          // Navigate to the action link
                          window.location.href = alert.actionLink;
                        }}
                      >
                        {alert.actionLabel}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                      {onDismiss && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => onDismiss(alert.type)}
                        >
                          Marquer comme vu
                        </Button>
                      )}
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            );
          })
        )}
      </CardContent>
    </Card>
  );
});

AlertsPanel.displayName = 'AlertsPanel';

export default AlertsPanel;