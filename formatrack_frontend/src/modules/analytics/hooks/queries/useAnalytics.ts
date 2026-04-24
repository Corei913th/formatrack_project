import { useQuery } from "@tanstack/react-query";
import { CACHE_TIME } from "@/constants/queries.constants";
import { analyticsService } from "@/modules/analytics/services/analytics.service";

export const ANALYTICS = {
  concours: (concoursId: string) => ["analytics", "concours", concoursId] as const,
  timeline: (params?: Record<string, unknown>) => ["analytics", "timeline", params] as const,
  regions: (params?: Record<string, unknown>) => ["analytics", "regions", params] as const,
  centres: (params?: Record<string, unknown>) => ["analytics", "centres", params] as const,
} as const;

export const useConcoursAnalytics = (concoursId: string) => {
  return useQuery({
    queryKey: ANALYTICS.concours(concoursId),
    queryFn: () => analyticsService.getConcoursAnalytics(concoursId),
    enabled: !!concoursId,
    staleTime: CACHE_TIME.STANDARD,
  });
};

export const useAnalyticsTimeline = (params?: {
  concours_id?: string;
  date_debut?: string;
  date_fin?: string;
  granularite?: "jour" | "semaine" | "mois";
}) => {
  return useQuery({
    queryKey: ANALYTICS.timeline(params),
    queryFn: () => analyticsService.getTimeline(params),
    staleTime: CACHE_TIME.STANDARD,
  });
};

export const useAnalyticsRegions = (params?: { concours_id?: string; session_id?: string }) => {
  return useQuery({
    queryKey: ANALYTICS.regions(params),
    queryFn: () => analyticsService.getRegions(params),
    staleTime: CACHE_TIME.STANDARD,
  });
};

export const useAnalyticsCentres = (params?: { concours_id?: string; session_id?: string }) => {
  return useQuery({
    queryKey: ANALYTICS.centres(params),
    queryFn: () => analyticsService.getCentres(params),
    staleTime: CACHE_TIME.STANDARD,
  });
};
