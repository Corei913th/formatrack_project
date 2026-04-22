import { User } from '@/modules/users';





export type AuthResponse = {
  user: User;
} & SessionResponse;

export type SessionResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
};
