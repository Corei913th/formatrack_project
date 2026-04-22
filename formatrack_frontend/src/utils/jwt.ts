import { UserRole } from "@/types/enums";
import { User } from '@/modules/users';



export function decodeJwt<T = unknown>(token: string): T | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const jsonPayload = decodeURIComponent(
      atob(padded)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload) as T;
  } catch {
    return null;
  }
}


export function extractUserFromAccessToken(token: string): Partial<User> | null {
  const claims = decodeJwt<Record<string, unknown>>(token);
  if (!claims) return null;
  return {
    first_name: (claims["first_name"] as string) || "",
    last_name: (claims["last_name"] as string) || "",
    email: (claims["email"] as string) || "",
    role: (claims["role"] as UserRole) || "",
    id: (claims["sub"] as string) || "",

  } as Partial<User>;
}

export function decodeExp(token: string) {
  try {
    const claims = decodeJwt<{ exp: number }>(token);
    return claims?.exp;
  } catch {
    return undefined;
  }
}
