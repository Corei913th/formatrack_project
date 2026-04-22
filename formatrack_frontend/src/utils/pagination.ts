import { ApiResponse, PaginatedApiResponse, PaginatedData } from "@/types/api.type";

/**
 * Helper pour adapter les réponses paginées de l'API au format attendu par l'application
 */
export function adaptPaginatedResponse<T>(
  apiResponse: PaginatedApiResponse<T>
): ApiResponse<PaginatedData<T>> {
  return {
    success: apiResponse.success,
    message: apiResponse.message,
    data: {
      data: apiResponse.data || [],
      meta: apiResponse.meta
    }
  };
}

/**
 * Helper pour construire les paramètres de pagination
 */
export function buildPaginationParams(
  page: number = 1,
  limit: number = 10,
  additionalParams?: Record<string, string | number | boolean>
): URLSearchParams {
  const params = new URLSearchParams();

  params.append('page', page.toString());
  params.append('per_page', limit.toString());

  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });
  }

  return params;
}

/**
 * Helper pour construire les paramètres de filtres
 */
export function buildFilterParams(filters: Record<string, any>): Record<string, string | number | boolean> {
  const params: Record<string, string | number | boolean> = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params[key] = value;
    }
  });

  return params;
}