import { CentresFilters } from '@/modules/centres';
import { ResultatsFilters } from '@/modules/resultats';

export const AUTH = {
  default: ["AUTH"],
  login: ["AUTH", "LOGIN"],
  register: ["AUTH", "REGISTER"],
  getProfile: ["AUTH", "GET_PROFILE"],
  refreshToken: ["AUTH", "REFRESH_TOKEN"],
  logout: ["AUTH", "LOGOUT"],
};

export const PROFILE = {
  default: ["PROFILE"],
  getProfile: ["PROFILE", "GET_PROFILE"],
  updateProfile: ["PROFILE", "UPDATE_PROFILE"],
  updatePassword: ["PROFILE", "UPDATE_PASSWORD"],
  uploadAvatar: ["PROFILE", "UPLOAD_AVATAR"],
};

/**
 * Cache configuration constants
 * Centralized TTL and cache time values for React Query
 */
export const CACHE_TIME = {
  /** 5 minutes - Standard stale time for most queries */
  STANDARD: 5 * 60 * 1000,
  /** 10 minutes - Extended stale time for rarely changing data */
  EXTENDED: 10 * 60 * 1000,
  /** 1 minute - Short stale time for frequently changing data */
  SHORT: 1 * 60 * 1000,
  /** 30 seconds - Very short stale time for real-time data */
  REALTIME: 30 * 1000,
} as const;

/**
 * Garbage collection time constants
 * How long unused data stays in cache before being garbage collected
 */
export const GC_TIME = {
  /** 10 minutes - Standard garbage collection time */
  STANDARD: 10 * 60 * 1000,
  /** 30 minutes - Extended garbage collection time */
  EXTENDED: 30 * 60 * 1000,
  /** 5 minutes - Short garbage collection time */
  SHORT: 5 * 60 * 1000,
} as const;

/**
 * Auto-refresh interval constants
 * For queries that need periodic updates
 */
export const REFETCH_INTERVAL = {
  /** 5 minutes - Standard auto-refresh interval */
  STANDARD: 5 * 60 * 1000,
  /** 1 minute - Frequent auto-refresh interval */
  FREQUENT: 1 * 60 * 1000,
  /** 10 minutes - Slow auto-refresh interval */
  SLOW: 10 * 60 * 1000,
} as const;

export const ECOLES = {
  default: ["ECOLES"],
  getEcoles: ["ECOLES", "GET_ECOLES"],
  getEcoleById: ["ECOLES", "GET_ECOLE_BY_ID"],
  getEcoleByCode: ["ECOLES", "GET_ECOLE_BY_CODE"],
  createEcole: ["ECOLES", "CREATE_ECOLE"],
  updateEcole: ["ECOLES", "UPDATE_ECOLE"],
  deleteEcole: ["ECOLES", "DELETE_ECOLE"],
  checkCodeUnique: ["ECOLES", "CHECK_CODE_UNIQUE"],
  toggleStatus: ["ECOLES", "TOGGLE_STATUS"],
  getActiveEcoles: ["ECOLES", "GET_ACTIVE_ECOLES"],
  uploadFile: ["ECOLES", "UPLOAD_FILE"],
  deleteFile: ["ECOLES", "DELETE_FILE"],
  previewHeader: ["ECOLES", "PREVIEW_HEADER"],
};

export const DEPARTEMENTS = {
  default: ["DEPARTEMENTS"],
  LIST: (filters?: any) =>
    filters ? ["DEPARTEMENTS", "LIST", filters] as const : ["DEPARTEMENTS", "LIST"] as const,
  DETAIL: ["DEPARTEMENTS", "DETAIL"],
  BY_CODE: ["DEPARTEMENTS", "BY_CODE"],
  ACTIVE: ["DEPARTEMENTS", "ACTIVE"],
  STATS: ["DEPARTEMENTS", "STATS"],
  CREATE: ["DEPARTEMENTS", "CREATE"],
  UPDATE: ["DEPARTEMENTS", "UPDATE"],
  DELETE: ["DEPARTEMENTS", "DELETE"],
  TOGGLE_STATUS: ["DEPARTEMENTS", "TOGGLE_STATUS"],
  CHECK_CODE_UNIQUE: ["DEPARTEMENTS", "CHECK_CODE_UNIQUE"],
};
// Filières
export const FILIERES = {
  default: ["FILIERES"],
  LIST: (filters?: any) =>
    filters ? ["FILIERES", "LIST", filters] as const : ["FILIERES", "LIST"] as const,
  DETAIL: ["FILIERES", "DETAIL"],
  BY_CODE: ["FILIERES", "BY_CODE"],
  ACTIVE: ["FILIERES", "ACTIVE"],
  STATS: ["FILIERES", "STATS"],
  CREATE: ["FILIERES", "CREATE"],
  UPDATE: ["FILIERES", "UPDATE"],
  DELETE: ["FILIERES", "DELETE"],
  TOGGLE_STATUS: ["FILIERES", "TOGGLE_STATUS"],
  CHECK_CODE_UNIQUE: ["FILIERES", "CHECK_CODE_UNIQUE"],
}

/**
 * Query keys for dashboard data
 * Organized by endpoint type for efficient cache management
 */
export const DASHBOARD = {
  GLOBAL: ["dashboard", "global"],
  ECOLE: (ecoleId: string) => ["dashboard", "ecole", ecoleId],
  MY_ECOLE: ["dashboard", "my-ecole"],
} as const;

// Niveaux
export const NIVEAUX = {
  default: ["NIVEAUX"],
  LIST: (filters?: any) =>
    filters ? ["NIVEAUX", "LIST", filters] as const : ["NIVEAUX", "LIST"] as const,
  DETAIL: ["NIVEAUX", "DETAIL"],
  BY_CODE: ["NIVEAUX", "BY_CODE"],
  ACTIVE: ["NIVEAUX", "ACTIVE"],
  STATS: ["NIVEAUX", "STATS"],
  CREATE: ["NIVEAUX", "CREATE"],
  UPDATE: ["NIVEAUX", "UPDATE"],
  DELETE: ["NIVEAUX", "DELETE"],
  TOGGLE_STATUS: ["NIVEAUX", "TOGGLE_STATUS"],
  CHECK_CODE_UNIQUE: ["NIVEAUX", "CHECK_CODE_UNIQUE"],
}

export const CENTRES = {
  centres: ["centres"] as const,
  centresList: (filters?: CentresFilters, page?: number, limit?: number) =>
    ["centres", "list", filters, page, limit] as const,
  centresActive: ["centres", "active"] as const,
  centreById: (id: string) => ["centres", id] as const,
};

export const REGIONS = {
  default: ["REGIONS"],
  LIST: ["REGIONS", "LIST"],
  DETAIL: ["REGIONS", "DETAIL"],
  ACTIVE: ["REGIONS", "ACTIVE"],
};

export const CONCOURS = {
  default: ["CONCOURS"],
  LIST: ["CONCOURS", "LIST"],
  DETAIL: ["CONCOURS", "DETAIL"],
  STATS: ["CONCOURS", "STATS"],
  CREATE: ["CONCOURS", "CREATE"],
  UPDATE: ["CONCOURS", "UPDATE"],
  DELETE: ["CONCOURS", "DELETE"],
  TOGGLE_STATUS: ["CONCOURS", "TOGGLE_STATUS"],
  CONFIGURE_PAYMENT: ["CONCOURS", "CONFIGURE_PAYMENT"],
};

export const CONCOURS_SPECS = {
  concoursSpecs: ["concours-specs"] as const,
  concoursSpecsList: (filters?: any, page?: number, limit?: number) =>
    ["concours-specs", "list", filters, page, limit] as const,
  concoursSpecById: (id: string) => ["concours-specs", id] as const,
};

export const DOCUMENTS = {
  default: ["DOCUMENTS"],
  REQUIS: ["DOCUMENTS", "REQUIS"],
  REQUIS_BY_CONCOURS: (concoursId: string) => ["DOCUMENTS", "REQUIS", concoursId] as const,
  VALIDATION: ["DOCUMENTS", "VALIDATION"],
  PENDING: ["DOCUMENTS", "VALIDATION", "PENDING"],
};

export const ALERTES = {
  default: ["ALERTES"],
  LIST: (filters?: any, page?: number, limit?: number) =>
    ["ALERTES", "LIST", filters, page, limit] as const,
  DETAIL: (id: string) => ["ALERTES", "DETAIL", id] as const,
  STATS: ["ALERTES", "STATS"] as const,
  CANDIDATURE: (candidatureId: string) => ["ALERTES", "CANDIDATURE", candidatureId] as const,
};

export const PAIEMENTS = {
  default: ["PAIEMENTS"],
  LIST: (filters?: any, page?: number, limit?: number) =>
    ["PAIEMENTS", "LIST", filters, page, limit] as const,
  DETAIL: (id: string) => ["PAIEMENTS", "DETAIL", id] as const,
  PENDING: ["PAIEMENTS", "PENDING"] as const,
  STATS: (concoursId?: string) => ["PAIEMENTS", "STATS", concoursId] as const,
  VALIDATION: ["PAIEMENTS", "VALIDATION"] as const,
};

export const USERS_STAFF = {
  default: ["USERS_STAFF"],
  LIST: ["USERS_STAFF", "LIST"],
  DETAIL: ["USERS_STAFF", "DETAIL"],
  CREATE: ["USERS_STAFF", "CREATE"],
  UPDATE: ["USERS_STAFF", "UPDATE"],
  DELETE: ["USERS_STAFF", "DELETE"],
  TOGGLE_STATUS: ["USERS_STAFF", "TOGGLE_STATUS"],
};

export const CONCOURS_FILIERES = {
  default: ["CONCOURS_FILIERES"],
  LIST: (concoursId: string) => ["CONCOURS_FILIERES", "LIST", concoursId] as const,
  DISPONIBLES: (concoursId: string) => ["CONCOURS_FILIERES", "DISPONIBLES", concoursId] as const,
};

export const CANDIDATS = {
  default: ["CANDIDATS"],
  CONCOURS: (concoursId: string, filters?: any) =>
    ["CANDIDATS", "CONCOURS", concoursId, filters] as const,
  DETAIL: (candidatId: string) => ["CANDIDATS", "DETAIL", candidatId] as const,
};

export const NOTES = {
  default: ["NOTES"],
  CANDIDAT: (concoursId: string, sessionId: string, candidatureId: string) =>
    ["NOTES", concoursId, sessionId, candidatureId] as const,
  MOYENNE: (concoursId: string, sessionId: string, candidatureId: string) =>
    ["NOTES", "moyenne", concoursId, sessionId, candidatureId] as const,
};

export const CONCOURS_CENTRES = {
  default: ["CONCOURS_CENTRES"],
  LIST: (concoursId: string) => ["CONCOURS_CENTRES", "LIST", concoursId] as const,
  ATTACH: ["CONCOURS_CENTRES", "ATTACH"],
  DETACH: ["CONCOURS_CENTRES", "DETACH"],
  UPDATE_STATUS: ["CONCOURS_CENTRES", "UPDATE_STATUS"],
  SYNC: ["CONCOURS_CENTRES", "SYNC"],
};

export const STATS_QUERIES = {
  GLOBAL: ["stats", "global"],
  ECOLES: ["stats", "ecoles"],
  DEPARTEMENTS: ["stats", "departements"],
  FILIERES: ["stats", "filieres"],
  NIVEAUX: ["stats", "niveaux"],
  CENTRES: ["stats", "centres"],
  CONCOURS: ["stats", "concours"],
} as const;

export const EPREUVES = {
  epreuves: ["epreuves"] as const,
  epreuvesList: (filters?: any, page?: number, limit?: number) =>
    ["epreuves", "list", filters, page, limit] as const,
  epreuveById: (id: string) => ["epreuves", id] as const,
};

export const ADMISSION_RULES = {
  default: ["ADMISSION_RULES"],
  DETAIL: (concoursId: string, sessionId: string) =>
    ["ADMISSION_RULES", "DETAIL", concoursId, sessionId] as const,
  CREATE: ["ADMISSION_RULES", "CREATE"],
  UPDATE: ["ADMISSION_RULES", "UPDATE"],
  DELETE: ["ADMISSION_RULES", "DELETE"],
};

export const RESULTATS = {
  default: ["RESULTATS"],
  LIST: (concoursId: string, sessionId: string, filters?: ResultatsFilters, page?: number, limit?: number) =>
    ["RESULTATS", "LIST", concoursId, sessionId, filters, page, limit] as const,
  CANDIDAT: (candidatureId: string) =>
    ["RESULTATS", "CANDIDAT", candidatureId] as const,
  CLASSEMENT: (filiereId: string, concoursId: string, sessionId: string) =>
    ["RESULTATS", "CLASSEMENT", filiereId, concoursId, sessionId] as const,
  PUBLICATION_STATUS: (concoursId: string, sessionId: string) =>
    ["RESULTATS", "PUBLICATION_STATUS", concoursId, sessionId] as const,
};

export const QUERY_KEYS = {
  AUTH,
  PROFILE,
  ECOLES,
  DEPARTEMENTS,
  FILIERES,
  NIVEAUX,
  CENTRES,
  REGIONS,
  CONCOURS,
  CONCOURS_SPECS,
  STATS_QUERIES,
  DOCUMENTS_REQUIS: DOCUMENTS.REQUIS,
  DOCUMENTS,
  ALERTES: ALERTES.LIST,
  ALERTE_DETAIL: ALERTES.DETAIL,
  ALERTES_STATS: ALERTES.STATS,
  ALERTES_CANDIDATURE: ALERTES.CANDIDATURE,
  PAIEMENTS: PAIEMENTS.LIST,
  PAIEMENT_DETAIL: PAIEMENTS.DETAIL,
  PAIEMENTS_PENDING: PAIEMENTS.PENDING,
  PAIEMENTS_STATS: PAIEMENTS.STATS,
  USERS_STAFF,
  CONCOURS_FILIERES: CONCOURS_FILIERES.LIST,
  FILIERES_DISPONIBLES: CONCOURS_FILIERES.DISPONIBLES,
  CANDIDATS_CONCOURS: CANDIDATS.CONCOURS,
  CANDIDAT_DETAIL: CANDIDATS.DETAIL,
  NOTES: "NOTES",
};

export const QUERIES = {
  AUTH,
  PROFILE,
  ECOLES,
  DEPARTEMENTS,
  FILIERES,
  NIVEAUX,
  CENTRES,
  REGIONS,
  CONCOURS,
  CONCOURS_SPECS,
  DOCUMENTS,
  ALERTES,
  PAIEMENTS,
  USERS_STAFF,
  CONCOURS_CENTRES,
  STATS_QUERIES,
  ADMISSION_RULES,
  RESULTATS,
};