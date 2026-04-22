import React from 'react';
import { Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FadeIn } from '@/components/animate/fade-in';

interface FiltersCardProps {
  children: React.ReactNode;
  delay?: number;
}

export const FiltersCard = React.memo<FiltersCardProps>(({ children, delay = 0.2 }) => {
  return (
    <FadeIn delay={delay}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {children}
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
});

FiltersCard.displayName = 'FiltersCard';
