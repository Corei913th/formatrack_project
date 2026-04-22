import React, { useState, useMemo } from 'react';
import { Search, Star, Clock } from 'lucide-react';
import Modal from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EcoleSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEcole: (ecoleId: string) => void;
  ecoles: Array<{
    id: string;
    code: string;
    libelle: string;
    region: string;
  }>;
}

const EcoleSelectorModal: React.FC<EcoleSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectEcole,
  ecoles
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Get recent écoles from localStorage
  const recentEcoles = useMemo(() => {
    try {
      const recent = localStorage.getItem('dashboard_recent_ecoles');
      if (recent) {
        const recentIds = JSON.parse(recent) as string[];
        return ecoles.filter(e => recentIds.includes(e.id)).slice(0, 5);
      }
    } catch (error) {
      console.error('Error loading recent écoles:', error);
    }
    return [];
  }, [ecoles]);

  // Get favorite écoles from localStorage
  const favoriteEcoles = useMemo(() => {
    try {
      const favorites = localStorage.getItem('dashboard_favorite_ecoles');
      if (favorites) {
        const favoriteIds = JSON.parse(favorites) as string[];
        return ecoles.filter(e => favoriteIds.includes(e.id));
      }
    } catch (error) {
      console.error('Error loading favorite écoles:', error);
    }
    return [];
  }, [ecoles]);

  const filteredEcoles = useMemo(() => {
    if (!searchTerm) return ecoles;

    const term = searchTerm.toLowerCase();
    return ecoles.filter(ecole =>
      ecole.libelle.toLowerCase().includes(term) ||
      ecole.code.toLowerCase().includes(term) ||
      ecole.region.toLowerCase().includes(term)
    );
  }, [ecoles, searchTerm]);

  const handleSelectEcole = (ecoleId: string) => {
    // Add to recent écoles
    try {
      const recent = localStorage.getItem('dashboard_recent_ecoles');
      let recentIds: string[] = recent ? JSON.parse(recent) : [];

      // Remove if already exists and add to front
      recentIds = recentIds.filter(id => id !== ecoleId);
      recentIds.unshift(ecoleId);

      // Keep only last 5
      recentIds = recentIds.slice(0, 5);

      localStorage.setItem('dashboard_recent_ecoles', JSON.stringify(recentIds));
    } catch (error) {
      console.error('Error saving recent école:', error);
    }

    onSelectEcole(ecoleId);
    onClose();
    setSearchTerm('');
  };

  const toggleFavorite = (ecoleId: string, event: React.MouseEvent) => {
    event.stopPropagation();

    try {
      const favorites = localStorage.getItem('dashboard_favorite_ecoles');
      let favoriteIds: string[] = favorites ? JSON.parse(favorites) : [];

      if (favoriteIds.includes(ecoleId)) {
        favoriteIds = favoriteIds.filter(id => id !== ecoleId);
      } else {
        favoriteIds.push(ecoleId);
      }

      localStorage.setItem('dashboard_favorite_ecoles', JSON.stringify(favoriteIds));

      // Force re-render by updating state
      setSearchTerm(prev => prev);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const isFavorite = (ecoleId: string) => {
    try {
      const favorites = localStorage.getItem('dashboard_favorite_ecoles');
      if (favorites) {
        const favoriteIds = JSON.parse(favorites) as string[];
        return favoriteIds.includes(ecoleId);
      }
    } catch (error) {
      console.error('Error checking favorite:', error);
    }
    return false;
  };

  const renderEcoleItem = (ecole: { id: string; code: string; libelle: string; region: string }) => (
    <div
      key={ecole.id}
      className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors group"
      onClick={() => handleSelectEcole(ecole.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="font-medium">{ecole.libelle}</div>
          <div className="text-sm text-muted-foreground">
            Code: {ecole.code}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{ecole.region}</Badge>
          <button
            onClick={(e) => toggleFavorite(ecole.id, e)}
            className="p-1 hover:bg-background rounded transition-colors"
            aria-label={isFavorite(ecole.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Star
              className={`h-4 w-4 ${isFavorite(ecole.id)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-muted-foreground group-hover:text-foreground'
                }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Sélectionner une École"
      description="Choisissez une école pour voir ses statistiques détaillées"
      size="md"
      showCloseButton
      closeButtonLabel="Annuler"
    >
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher par nom, code ou région..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">
              Toutes ({ecoles.length})
            </TabsTrigger>
            <TabsTrigger value="recent">
              <Clock className="h-4 w-4 mr-1" />
              Récentes ({recentEcoles.length})
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <Star className="h-4 w-4 mr-1" />
              Favoris ({favoriteEcoles.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <ScrollArea className="h-96">
              <div className="space-y-2 pr-4">
                {filteredEcoles.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Aucune école trouvée
                  </div>
                ) : (
                  filteredEcoles.map(renderEcoleItem)
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="recent" className="mt-4">
            <ScrollArea className="h-96">
              <div className="space-y-2 pr-4">
                {recentEcoles.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Aucune école récente</p>
                    <p className="text-xs mt-1">Les écoles consultées apparaîtront ici</p>
                  </div>
                ) : (
                  recentEcoles.map(renderEcoleItem)
                )}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="favorites" className="mt-4">
            <ScrollArea className="h-96">
              <div className="space-y-2 pr-4">
                {favoriteEcoles.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Star className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Aucun favori</p>
                    <p className="text-xs mt-1">Cliquez sur l'étoile pour ajouter des favoris</p>
                  </div>
                ) : (
                  favoriteEcoles.map(renderEcoleItem)
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </Modal>
  );
};

export default EcoleSelectorModal;