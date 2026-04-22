import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersStaffService } from "@/modules/users";
import { UsersStaffFilters, CreateUserStaffDTO, UpdateUserStaffDTO } from "@/modules/users";
import { QUERY_KEYS } from "@/constants/queries.constants";

/**
 * Hook to get the list of staff users
 */
export const useUsersStaff = (filters?: UsersStaffFilters, page = 1, limit = 15) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS_STAFF.LIST, filters, page, limit],
    queryFn: () => usersStaffService.getUsersStaff(filters, page, limit),
  });
};

/**
 * Hook to get a user by ID
 */
export const useUserStaffById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS_STAFF.DETAIL, id],
    queryFn: () => usersStaffService.getUserStaffById(id),
    enabled: !!id,
  });
};

/**
 * Hook to create a staff user
 */
export const useCreateUserStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserStaffDTO) => usersStaffService.createUserStaff(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS_STAFF.LIST],
      });
    },
  });
};

/**
 * Hook to update a staff user
 */
export const useUpdateUserStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserStaffDTO) => usersStaffService.updateUserStaff(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS_STAFF.LIST],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS_STAFF.DETAIL, variables.id],
      });
    },
  });
};

/**
 * Hook to delete a staff user
 */
export const useDeleteUserStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersStaffService.deleteUserStaff(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS_STAFF.LIST],
      });
    },
  });
};

/**
 * Hook to toggle user status
 */
export const useToggleUserStaffStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersStaffService.toggleUserStaffStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS_STAFF.LIST],
      });
    },
  });
};
