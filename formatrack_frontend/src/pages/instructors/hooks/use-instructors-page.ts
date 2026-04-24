import { useState } from "react";
import { toast } from "sonner";
import {
  useInstructors,
  useDeleteInstructor,
  Instructor,
  InstructorFilters,
} from "@/modules/instructors";
import { useDataExtraction } from "@/hooks/common/useDataExtraction";
import { usePageFilters } from "@/hooks/use-page-filters";

export const useInstructorsPage = () => {
  const [page, setPage] = useState(1);
  const limit = 15;

  const { filters, updateFilter, resetFilters, hasActiveFilters } =
    usePageFilters<InstructorFilters>({
      initialFilters: {},
      onPageReset: () => setPage(1),
    });

  const { data, isLoading } = useInstructors(filters, page, limit);
  const deleteMutation = useDeleteInstructor();

  const { data: instructors, meta: pagination } =
    useDataExtraction<Instructor>(data);

  const total = pagination?.total ?? 0;
  const actifs = instructors.filter((i) => i.user.is_active).length;
  const inactifs = instructors.filter((i) => !i.user.is_active).length;

  const handleSearch = (search: string) =>
    updateFilter("search", search || undefined);

  const handleStatusFilter = (status: string) =>
    updateFilter(
      "is_active",
      status === "all" ? undefined : status === "true"
    );

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Formateur supprimé avec succès");
    } catch {
      // error already toasted by refractHttpError
    }
  };

  return {
    instructors,
    pagination,
    total,
    actifs,
    inactifs,
    filters,
    hasActiveFilters: hasActiveFilters(),
    handleSearch,
    handleStatusFilter,
    handleResetFilters: resetFilters,
    page,
    setPage,
    isLoading,
    isDeleting: deleteMutation.isPending,
    handleDelete,
  };
};
