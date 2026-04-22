import React, { useState } from 'react';
import { Trophy, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TopEcolesChartProps } from '@/modules/dashboard'
import { TopEcole } from '@/modules/dashboard';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

// Region-based color mapping
const REGION_COLORS: Record<string, string> = {
  'Centre': 'hsl(var(--chart-1))',
  'Littoral': 'hsl(var(--chart-2))',
  'Ouest': 'hsl(var(--chart-3))',
  'Nord': 'hsl(var(--chart-4))',
  'Sud': 'hsl(var(--chart-5))',
  'Est': 'hsl(220, 70%, 50%)',
  'Adamaoua': 'hsl(280, 70%, 50%)',
  'Extrême-Nord': 'hsl(340, 70%, 50%)',
  'Nord-Ouest': 'hsl(40, 70%, 50%)',
  'Sud-Ouest': 'hsl(160, 70%, 50%)',
};

const DEFAULT_COLOR = 'hsl(var(--primary))';

const TopEcolesChart: React.FC<TopEcolesChartProps> = React.memo(({ data, isLoading }) => {
  const [selectedEcole, setSelectedEcole] = useState<TopEcole | null>(null);
  const [viewMode, setViewMode] = useState<'chart' | 'list'>('chart');

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Écoles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-muted-foreground">Chargement du classement des écoles...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Format data for Recharts
  const chartData = data.map((ecole, index) => ({
    ...ecole,
    rank: index + 1,
    shortName: ecole.code,
    color: REGION_COLORS[ecole.region] || DEFAULT_COLOR,
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const ecole = payload[0].payload;
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3 max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="default">#{ecole.rank}</Badge>
            <p className="font-semibold text-sm">{ecole.libelle}</p>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Code:</span>
              <span className="font-medium">{ecole.code}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span className="font-medium">{ecole.region}</span>
            </div>
            <div className="flex items-center gap-2 pt-1 border-t">
              <span className="text-muted-foreground">Inscriptions:</span>
              <span className="font-bold text-primary">{ecole.total_inscriptions}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const handleBarClick = (ecole: TopEcole) => {
    setSelectedEcole(selectedEcole?.id === ecole.id ? null : ecole);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'chart' ? 'list' : 'chart');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Top Écoles par Inscriptions
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleViewMode}
          >
            {viewMode === 'chart' ? 'Liste' : 'Graphique'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {viewMode === 'chart' ? (
            <>
              {/* Horizontal Bar Chart */}
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      type="number"
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis
                      type="category"
                      dataKey="shortName"
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      width={90}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      wrapperStyle={{ paddingTop: '20px' }}
                      formatter={() => 'Inscriptions'}
                    />
                    <Bar
                      dataKey="total_inscriptions"
                      name="Inscriptions"
                      radius={[0, 8, 8, 0]}
                      onClick={(data: any) => {
                        if (data && data.id) {
                          const ecole = chartData.find(e => e.id === data.id);
                          if (ecole) handleBarClick(ecole);
                        }
                      }}
                      cursor="pointer"
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          opacity={selectedEcole && selectedEcole.id !== entry.id ? 0.3 : 1}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Selected École Details */}
              {selectedEcole && (
                <div className="p-4 border rounded-lg bg-muted/50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="default">
                          #{chartData.find(e => e.id === selectedEcole.id)?.rank}
                        </Badge>
                        <h3 className="font-semibold">{selectedEcole.libelle}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{selectedEcole.code}</span>
                        <span>•</span>
                        <MapPin className="h-3 w-3" />
                        <span>{selectedEcole.region}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedEcole(null)}
                    >
                      ✕
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Total inscriptions:</span>
                    <Badge variant="outline" className="text-base">
                      {selectedEcole.total_inscriptions}
                    </Badge>
                  </div>
                </div>
              )}

              {/* Region Legend */}
              <div className="pt-4 border-t">
                <div className="text-xs font-medium mb-2 text-muted-foreground">Régions</div>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(data.map(e => e.region))).map((region) => (
                    <div key={region} className="flex items-center gap-1.5">
                      <div
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: REGION_COLORS[region] || DEFAULT_COLOR }}
                      />
                      <span className="text-xs">{region}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* List View */
            <div className="space-y-2">
              {chartData.map((ecole) => (
                <div
                  key={ecole.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => handleBarClick(ecole)}
                >
                  <div className="flex items-center gap-3">
                    <Badge variant={ecole.rank <= 3 ? 'default' : 'secondary'}>
                      #{ecole.rank}
                    </Badge>
                    <div>
                      <div className="font-medium">{ecole.libelle}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <span>{ecole.code}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{ecole.region}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {ecole.total_inscriptions} inscriptions
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

TopEcolesChart.displayName = 'TopEcolesChart';

export default TopEcolesChart;