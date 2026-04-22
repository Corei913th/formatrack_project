import React from 'react';
import { PlusIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animate/fade-in';

interface DataTableCardProps {
  title: string;
  meta?: { total: number };
  entityName: string;
  onCreateClick: () => void;
  createButtonLabel: string;
  children: React.ReactNode;
  delay?: number;
}

export const DataTableCard = React.memo<DataTableCardProps>(({
  title,
  meta,
  entityName,
  onCreateClick,
  createButtonLabel,
  children,
  delay = 0.3,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {title}
            {meta && (
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({meta.total} {entityName}{meta.total > 1 ? 's' : ''})
              </span>
            )}
          </CardTitle>
          <Button onClick={onCreateClick} size="sm">
            <PlusIcon className="h-4 w-4" />
            {createButtonLabel}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <FadeIn delay={delay}>
          {children}
        </FadeIn>
      </CardContent>
    </Card>
  );
});

DataTableCard.displayName = 'DataTableCard';
