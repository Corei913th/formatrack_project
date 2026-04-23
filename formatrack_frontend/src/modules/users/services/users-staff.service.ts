import { baseHttpClient } from "@/lib/baseHttpClient";
import { refractHttpError } from "@/utils/errors";
import { adaptPaginatedResponse, buildPaginationParams, buildFilterParams } from "@/utils/pagination";
import { ApiResponse, PaginatedApiResponse } from "@/types/api.type";
import { UserStaff, UsersStaffFilters, CreateUserStaffDTO, UpdateUserStaffDTO } from "@/modules/users";

class UsersStaffService {
  private readonly baseUrl = "admin/users";

  /**
   * Get the list of staff users with pagination and filters
   */
  getUsersStaff = async (
    filters?: UsersStaffFilters,
    page = 1,
    limit = 15
  ) => {
    try {
      const filterParams = filters ? buildFilterParams(filters) : {};
      const params = buildPaginationParams(page, limit, filterParams);

      const response = await baseHttpClient.get<PaginatedApiResponse<UserStaff>>(
        `${this.baseUrl}?${params.toString()}`
      );
      return adaptPaginatedResponse(response.data);
    } catch (error) {
      throw refractHttpError(error);
    }
  };

  /**
   * Get a user by ID
   */
  getUserStaffById = async (id: string): Promise<ApiResponse<UserStaff>> => {
    try {
      const response = await baseHttpClient.get<ApiResponse<UserStaff>>(
        `${this.baseUrl}/${id}`
      );
      return response.data;
    } catch (error) {
      throw refractHttpError(error);
    }
  };

  /**
   * Create a new staff user
   */
  createUserStaff = async (data: CreateUserStaffDTO): Promise<ApiResponse<UserStaff>> => {
    try {
      const response = await baseHttpClient.post<ApiResponse<UserStaff>>(
        this.baseUrl,
        data
      );
      return response.data;
    } catch (error) {
      throw refractHttpError(error);
    }
  };

  /**
   * Update a staff user
   */
  updateUserStaff = async (data: UpdateUserStaffDTO): Promise<ApiResponse<UserStaff>> => {
    try {
      const { id, ...updateData } = data;
      const response = await baseHttpClient.put<ApiResponse<UserStaff>>(
        `${this.baseUrl}/${id}`,
        updateData
      );
      return response.data;
    } catch (error) {
      throw refractHttpError(error);
    }
  };

  /**
   * Delete (deactivate) a staff user
   */
  deleteUserStaff = async (id: string): Promise<ApiResponse<void>> => {
    try {
      const response = await baseHttpClient.delete<ApiResponse<void>>(
        `${this.baseUrl}/${id}`
      );
      return response.data;
    } catch (error) {
      throw refractHttpError(error);
    }
  };

  /**
   * Toggle user status (active/inactive)
   */
  toggleUserStaffStatus = async (id: string): Promise<ApiResponse<UserStaff>> => {
    try {
      const response = await baseHttpClient.patch<ApiResponse<UserStaff>>(
        `${this.baseUrl}/${id}/toggle-status`
      );
      return response.data;
    } catch (error) {
      throw refractHttpError(error);
    }
  };
}

export const usersStaffService = new UsersStaffService();
