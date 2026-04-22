import { useState } from "react";
import { useUsersStaff, useDeleteUserStaff, UserStaff, UsersStaffFilters } from "@/modules/users";
import { useUsersStats } from "@/modules/users/hooks/useUsersStats";
import { useDataExtraction } from "@/hooks/common/useDataExtraction";
import { usePageFilters } from "@/hooks/use-page-filters";
import { toast } from "sonner";

export const useUsersStaffPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { filters, updateFilter, resetFilters, hasActiveFilters: checkActiveFilters } = usePageFilters<UsersStaffFilters>({
    initialFilters: {},
    onPageReset: () => setPage(1),
  });

  const { data, isLoading } = useUsersStaff(filters, page, limit);
  const deleteMutation = useDeleteUserStaff();

  const { data: users, meta: pagination } = useDataExtraction<UserStaff>(data);
  const totalUsers = pagination?.total || 0;

  const { actifs, inactifs } = useUsersStats({ data: users });

  const handleSearch = (search: string) => {
    updateFilter("search", search || undefined);
  };

  const handleStatusFilter = (status: string) => {
    updateFilter("is_active", status === "all" ? undefined : status === "true");
  };

  const handleResetFilters = () => {
    resetFilters();
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteMutation.mutateAsync(userId);
      toast.success("Utilisateur supprimé avec succès");
    } catch (error: any) {
      toast.error(error?.message || "Erreur lors de la suppression");
    }
  };

  return {
    // Data
    users,
    pagination,
    totalUsers,
    actifs,
    inactifs,

    // Filters
    filters,
    hasActiveFilters: checkActiveFilters(),
    handleSearch,
    handleStatusFilter,
    handleResetFilters,

    // Pagination
    page,
    setPage,

    // Loading
    isLoading,
    isDeleting: deleteMutation.isPending,

    // Actions
    handleDelete,
  };
};
