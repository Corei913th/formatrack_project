import { baseHttpClient } from "@/lib/baseHttpClient";
import { refractHttpError } from "@/utils/errors";
import {
  adaptPaginatedResponse,
  buildPaginationParams,
  buildFilterParams,
} from "@/utils/pagination";
import { ApiResponse, PaginatedApiResponse } from "@/types/api.type";
import { Instructor, InstructorFilters } from "../types/instructor.type";
import { CreateInstructorDTO, UpdateInstructorDTO } from "../schemas/instructor.schema";

class InstructorService {
  private readonly baseUrl = "instructors";

  list = async (filters?: InstructorFilters, page = 1, limit = 15) => {
    try {
      const filterParams = filters ? buildFilterParams(filters) : {};
      const params = buildPaginationParams(page, limit, filterParams);
      const response = await baseHttpClient.get<PaginatedApiResponse<Instructor>>(
        `${this.baseUrl}?${params.toString()}`
      );
      return adaptPaginatedResponse(response.data);
    } catch (error) {
      throw refractHttpError(error);
    }
  };

  getById = async (id: string): Promise<ApiResponse<Instructor>> => {
    try {
      const response = await baseHttpClient.get<ApiResponse<Instructor>>(
        `${this.baseUrl}/${id}`
      );
      return response.data;
    } catch (error) {
      throw refractHttpError(error);
    }
  };

  create = async (data: CreateInstructorDTO): Promise<ApiResponse<Instructor>> => {
    try {
      const response = await baseHttpClient.post<ApiResponse<Instructor>>(
        this.baseUrl,
        data
      );
      return response.data;
    } catch (error) {
      throw refractHttpError(error);
    }
  };

  update = async (data: UpdateInstructorDTO): Promise<ApiResponse<Instructor>> => {
    try {
      const { id, ...payload } = data;
      const response = await baseHttpClient.put<ApiResponse<Instructor>>(
        `${this.baseUrl}/${id}`,
        payload
      );
      return response.data;
    } catch (error) {
      throw refractHttpError(error);
    }
  };

  delete = async (id: string): Promise<ApiResponse<void>> => {
    try {
      const response = await baseHttpClient.delete<ApiResponse<void>>(
        `${this.baseUrl}/${id}`
      );
      return response.data;
    } catch (error) {
      throw refractHttpError(error);
    }
  };
}

export const instructorService = new InstructorService();
