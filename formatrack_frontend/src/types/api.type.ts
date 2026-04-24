

export type ApiResponse<T = null> = {
  count?: number;
  data: T | null;
  message: string;
  success: boolean;
};

// Type pour les métadonnées de pagination (format Laravel)
export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

// Type pour les réponses paginées
export interface PaginatedData<T> {
  data: T[];
  meta: PaginationMeta;
}

// Type pour les réponses API paginées
export type PaginatedApiResponse<T> = {
  success: boolean;
  message: string;
  data: T[];
  meta: PaginationMeta;
};

export interface DataPagination<T = unknown> {
  total: number;
  data: T[];
}

export interface BaseEntity {
  id: string;
  created_at: string | null;
  updated_at: string | null;
}

