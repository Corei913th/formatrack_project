import { baseHttpClient } from "@/lib/baseHttpClient";
import { refractHttpError } from "@/utils/errors";
import type { ConcoursAnalyticsResponse, StatsCentresResponse, StatsRegionsResponse, StatsTimelineResponse } from "../types/analytics.type";

class AnalyticsService {
  private readonly baseUrl = "admin/stats";

  async getConcoursAnalytics(concoursId: string): Promise<ConcoursAnalyticsResponse> {
    try {
      const response = await baseHttpClient.get<ConcoursAnalyticsResponse>(`${this.baseUrl}/concours/${concoursId}`);
      return response.data;
    } catch (error) {
      throw refractHttpError(error);
    }
  }

  async getTimeline(params?: {
    concours_id?: string;
    date_debut?: string;
    date_fin?: string;
    granularite?: "jour" | "semaine" | "mois";
  }): Promise<StatsTimelineResponse> {
    try {
      const response = await baseHttpClient.get<StatsTimelineResponse>(`${this.baseUrl}/timeline`, { params });
      return response.data;
    } catch (error) {
      throw refractHttpError(error);
    }
  }

  async getRegions(params?: { concours_id?: string; session_id?: string }): Promise<StatsRegionsResponse> {
    try {
      const response = await baseHttpClient.get<StatsRegionsResponse>(`${this.baseUrl}/regions`, { params });
      return response.data;
    } catch (error) {
      throw refractHttpError(error);
    }
  }

  async getCentres(params?: { concours_id?: string; session_id?: string }): Promise<StatsCentresResponse> {
    try {
      const response = await baseHttpClient.get<StatsCentresResponse>(`${this.baseUrl}/centres`, { params });
      return response.data;
    } catch (error) {
      throw refractHttpError(error);
    }
  }
}

export const analyticsService = new AnalyticsService();
