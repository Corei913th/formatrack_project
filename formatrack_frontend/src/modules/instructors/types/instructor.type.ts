import { BaseEntity } from "@/types/api.type";

export interface InstructorUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  is_active: boolean;
}

export interface Instructor extends BaseEntity {
  specialties?: string | null;
  hourly_rate?: string | null;
  user: InstructorUser;
}

export interface InstructorFilters {
  search?: string;
  is_active?: boolean;
}
