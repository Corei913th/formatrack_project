import { STORAGE_KEY_NAME } from "./app.constants";

export const SESSION_SECRET = import.meta.env.VITE_SESSION_SECRET!;
export const SESSION_KEY_NAME = STORAGE_KEY_NAME;
export const TOKEN_KEY_NAME = "auth-token";
export const REFRESH_TOKEN_KEY_NAME = "refresh-token";
export const SESSION_ALGO = "HS256";
export const SESSION_EXPIRATION_TIME = 24 * 60 * 60 * 7; // 7 days
export const REFRESH_LEEWAY_SECONDS = 60; // Proactive refresh N seconds before expiration
