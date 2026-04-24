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

// Les types CreateUserStaffDTO et UpdateUserStaffDTO sont déjà exportés par le schéma Zod
// pour éviter les conflits lors du build.
