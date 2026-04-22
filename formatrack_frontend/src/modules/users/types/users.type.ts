import { UserRole } from "@/types/enums";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  phone?: string;
  is_active: boolean;
  email_verifie: boolean;
  email_verifie_at?: Date | string;
  role: UserRole;
  created_at?: Date | string;
  updated_at?: Date | string;
  notifications?: Notification[];
}

export interface Notification {
  id: string;
  user_id: string;
  message: string;
  created_at?: Date | string;
}