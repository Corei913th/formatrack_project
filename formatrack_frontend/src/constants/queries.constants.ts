;

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




export const USERS_STAFF = {
  default: ["USERS_STAFF"],
  LIST: ["USERS_STAFF", "LIST"],
  DETAIL: ["USERS_STAFF", "DETAIL"],
  CREATE: ["USERS_STAFF", "CREATE"],
  UPDATE: ["USERS_STAFF", "UPDATE"],
  DELETE: ["USERS_STAFF", "DELETE"],
  TOGGLE_STATUS: ["USERS_STAFF", "TOGGLE_STATUS"],
};







export const QUERY_KEYS = {
  AUTH,
  PROFILE,
  ECOLES,
  DEPARTEMENTS,
  FILIERES,
  USERS_STAFF,
  NOTES: "NOTES",
};

export const QUERIES = {
  AUTH,
  PROFILE,
  ECOLES,
  DEPARTEMENTS,
  FILIERES,
  USERS_STAFF,
};