import { UserRole } from "@/types/enums";
import { BaseEntity } from "@/types/api.type";

export interface UserStaff extends BaseEntity {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role: UserRole;
  is_active: boolean;
}

export interface UsersStaffFilters {
  search?: string;
  role?: UserRole;
  is_active?: boolean;
}

export type CreateUserStaffDTO = Omit<UserStaff, "id" | "created_at" | "updated_at"> & {
  password: string;
  password_confirmation: string;
};

export type UpdateUserStaffDTO = Partial<Omit<CreateUserStaffDTO, "password" | "password_confirmation">> & {
  id: string;
  password?: string;
  password_confirmation?: string;
};
