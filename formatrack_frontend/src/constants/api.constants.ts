export const TOKEN_TYPE = "Bearer";

export const REQUEST_HEADER_AUTH_KEY = "Authorization";

export const UNAUTHORIZED_STATUS_NUMBERS = [401];

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// API v1 endpoints
export const API_V1 = `${BASE_URL}v1`;
export const API_V1_PUBLIC = `${API_V1}/public`;
export const API_V1_CANDIDAT = `${API_V1}/candidat`;
export const API_V1_ADMIN = `${API_V1}/admin`;