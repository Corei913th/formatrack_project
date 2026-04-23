import React, { useState } from 'react';
import { TrendingUp, ZoomIn, ZoomOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EvolutionChartProps } from '@/modules/dashboard';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const EvolutionChart: React.FC<EvolutionChartProps> = React.memo(({ data, period, isLoading }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showArea, setShowArea] = useState<boolean>(true);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Évolution des Inscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-muted-foreground">Chargement du graphique d'évolution...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Format data for Recharts
  const chartData = data.data.map((item) => ({
    date: item.date,
    inscriptions: item.inscriptions,
    formattedDate: format(parseISO(item.date), 'dd MMM', { locale: fr }),
  }));

  // Calculate zoom range
  const totalPoints = chartData.length;
  const visiblePoints = Math.max(5, Math.floor(totalPoints / zoomLevel));
  const startIndex = Math.max(0, totalPoints - visiblePoints);
  const visibleData = chartData.slice(startIndex);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="font-medium text-sm mb-1">
            {format(parseISO(data.date), 'dd MMMM yyyy', { locale: fr })}
          </p>
          <p className="text-sm text-primary font-semibold">
            {data.inscriptions} inscription{data.inscriptions > 1 ? 's' : ''}
          </p>
        </div>
      );
    }
    return null;
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  };

  const toggleChartType = () => {
    setShowArea(!showArea);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Évolution - {period}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              Total: {data.total_periode}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart Controls */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {visibleData.length} point{visibleData.length > 1 ? 's' : ''} de données affiché{visibleData.length > 1 ? 's' : ''}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleChartType}
              >
                {showArea ? 'Ligne' : 'Aire'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 5}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {showArea ? (
                <AreaChart
                  data={visibleData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorInscriptions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="formattedDate"
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="line"
                  />
                  <Area
                    type="monotone"
                    dataKey="inscriptions"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorInscriptions)"
                    name="Inscriptions"
                    strokeWidth={2}
                  />
                </AreaChart>
              ) : (
                <LineChart
                  data={visibleData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="formattedDate"
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="line"
                  />
                  <Line
                    type="monotone"
                    dataKey="inscriptions"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Inscriptions"
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-4 text-sm pt-4 border-t">
            <div>
              <div className="font-medium">Période</div>
              <div className="text-muted-foreground">{data.periode}</div>
            </div>
            <div>
              <div className="font-medium">Points de données</div>
              <div className="text-muted-foreground">{data.data.length}</div>
            </div>
            <div>
              <div className="font-medium">Moyenne/jour</div>
              <div className="text-muted-foreground">
                {data.data.length > 0 ? Math.round(data.total_periode / data.data.length) : 0}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

EvolutionChart.displayName = 'EvolutionChart';

export default EvolutionChart;