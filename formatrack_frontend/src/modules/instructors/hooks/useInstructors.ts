import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instructorService } from "../services/instructor.service";
import { InstructorFilters } from "../types/instructor.type";
import { CreateInstructorDTO, UpdateInstructorDTO } from "../schemas/instructor.schema";

export const INSTRUCTOR_KEYS = {
  all: ["INSTRUCTORS"] as const,
  list: (filters?: InstructorFilters, page?: number, limit?: number) =>
    ["INSTRUCTORS", "LIST", filters, page, limit] as const,
  detail: (id: string) => ["INSTRUCTORS", "DETAIL", id] as const,
};

export const useInstructors = (
  filters?: InstructorFilters,
  page = 1,
  limit = 15
) =>
  useQuery({
    queryKey: INSTRUCTOR_KEYS.list(filters, page, limit),
    queryFn: () => instructorService.list(filters, page, limit),
  });

export const useInstructorById = (id: string) =>
  useQuery({
    queryKey: INSTRUCTOR_KEYS.detail(id),
    queryFn: () => instructorService.getById(id),
    enabled: !!id,
  });

export const useCreateInstructor = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateInstructorDTO) => instructorService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: INSTRUCTOR_KEYS.all }),
  });
};

export const useUpdateInstructor = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateInstructorDTO) => instructorService.update(data),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: INSTRUCTOR_KEYS.all });
      qc.invalidateQueries({ queryKey: INSTRUCTOR_KEYS.detail(vars.id) });
    },
  });
};

export const useDeleteInstructor = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => instructorService.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: INSTRUCTOR_KEYS.all }),
  });
};
