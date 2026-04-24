import type { ApiResponse } from "@/types/api.type";

export type TimelinePoint = {
  periode: string;
  nombre: number;
  cumul?: number;
  montant?: number;
};

export type StatsTimelineResponse = ApiResponse<{
  inscriptions: TimelinePoint[];
  paiements: TimelinePoint[];
  projections: {
    inscriptions_actuelles: number;
    jours_ecoules: number;
    rythme_actuel: string;
  };
}>;

export type RegionGlobalStat = {
  region: string;
  candidatures: number;
  pourcentage: number;
};

export type StatsRegionsResponse = ApiResponse<RegionGlobalStat[]>;

export type CentreGlobalStat = {
  centre_id: string;
  nom_centre: string;
  ville: string;
  region: string;
  capacite: number;
  candidatures_assignees: number;
  taux_occupation: number;
};

export type StatsCentresResponse = ApiResponse<CentreGlobalStat[]>;

export type ConcoursStatsGlobal = {
  total_candidatures: number;
  actives: number;
  invalides: number;
  validees: number;
  places_disponibles: number;
  taux_remplissage: number;
};

export type FiliereStat = {
  filiere_id: string;
  nom_filiere: string;
  nombre_places: number;
  candidatures: number;
  taux_remplissage: number;
};

export type ConcoursGenderStats = {
  masculin: number;
  feminin: number;
  pourcentage_masculin: number;
  pourcentage_feminin: number;
};

export type ConcoursAnalyticsResponse = ApiResponse<{
  concours: {
    id: string;
    libelle_concours: string;
  };
  global: ConcoursStatsGlobal;
  par_filiere: FiliereStat[];
  par_region: Record<string, { nombre: number; pourcentage: number }>;
  par_genre: ConcoursGenderStats;
  pyramide_ages: {
    tranches: Array<{ tranche: string; masculin: number; feminin: number; total: number }>;
    age_moyen: number;
    age_median: number;
    age_min: number;
    age_max: number;
  };
  par_serie_bac: Record<string, number>;
  par_mention: Record<string, number>;
  par_etablissement_origine: Array<{ etablissement: string; nombre: number }>;
  timeline: {
    inscriptions_par_jour: Array<{ date: string; nombre: number }>;
  };
}>;
