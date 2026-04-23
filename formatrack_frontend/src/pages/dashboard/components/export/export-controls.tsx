import React from 'react';
import { Download, FileText, Table } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExportOptions } from '@/modules/dashboard';

interface ExportControlsProps {
  onExport: (options: ExportOptions) => void;
  isExporting: boolean;
}

const ExportControls: React.FC<ExportControlsProps> = ({ onExport, isExporting }) => {
  const handleExport = (format: 'pdf' | 'excel') => {
    onExport({
      format,
      includeCharts: true,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export des Données
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2">
          <Button
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
            variant="outline"
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Export PDF
          </Button>
          <Button
            onClick={() => handleExport('excel')}
            disabled={isExporting}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Table className="h-4 w-4" />
            Export Excel
          </Button>
        </div>
        {isExporting && (
          <div className="mt-3 text-sm text-muted-foreground flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            Export en cours...
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExportControls;