import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "@/modules/auth";
import { AUTH } from "@/constants/queries.constants";
import { LoginDTO } from "@/modules/auth";
import { queryClient } from "@/lib/queryClient";

export const useLogin = () => {
  return useMutation({
    mutationKey: AUTH.login,
    mutationFn: (dto: LoginDTO) => authService.login(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH.getProfile });
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationKey: AUTH.refreshToken,
    mutationFn: () => authService.refreshToken(),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationKey: AUTH.logout,
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useGetProfile = (retrieveProfile = false) =>
  useQuery({
    queryKey: [...AUTH.getProfile, retrieveProfile],
    queryFn: () => authService.getProfile(),
    enabled: retrieveProfile,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    retryOnMount: false,
  });
