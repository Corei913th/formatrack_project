import { useState } from "react";
import { PageHeader } from "@/components/pageHeader";
import { FadeIn } from "@/components/animate/fade-in";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, GraduationCap, UserCheck, UserX } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SearchFilter } from "@/components/filters/search-filter";
import { StatusFilter } from "@/components/filters/status-filter";
import { FiltersResultBar } from "@/components/common/filters-result-bar";
import { Instructor } from "@/modules/instructors";
import { InstructorsDataTable } from "./components/instructors-data-table";
import { CreateInstructorModal } from "./modals/create-instructor-modal";
import { EditInstructorSheet } from "./modals/edit-instructor-sheet";
import { useInstructorsPage } from "./hooks/use-instructors-page";

export default function InstructorsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selected, setSelected] = useState<Instructor | null>(null);
  const [toDelete, setToDelete] = useState<Instructor | null>(null);

  const {
    instructors,
    pagination,
    total,
    actifs,
    inactifs,
    filters,
    hasActiveFilters,
    handleSearch,
    handleStatusFilter,
    handleResetFilters,
    setPage,
    isLoading,
    handleDelete,
  } = useInstructorsPage();

  const handleEdit = (instructor: Instructor) => {
    setSelected(instructor);
    setIsEditOpen(true);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    await handleDelete(toDelete.id);
    setToDelete(null);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <FadeIn direction="down" duration={0.3}>
        <div className="flex items-center gap-4">
          <GraduationCap className="h-8 w-8" />
          <PageHeader
            title="Gestion des formateurs"
            subtitle="Consultez, ajoutez, modifiez et supprimez les formateurs"
          />
        </div>
      </FadeIn>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total}</div>
            <p className="text-xs text-muted-foreground">Formateurs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actifs</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{actifs}</div>
            <p className="text-xs text-muted-foreground">Comptes actifs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactifs</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{inactifs}</div>
            <p className="text-xs text-muted-foreground">Comptes inactifs</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <SearchFilter
            value={filters.search}
            onValueChange={handleSearch}
            placeholder="Rechercher par nom, email..."
          />
          <StatusFilter
            value={
              filters.is_active === undefined
                ? "all"
                : filters.is_active
                  ? "true"
                  : "false"
            }
            onValueChange={handleStatusFilter}
            options={[
              { value: "all", label: "Tous les statuts" },
              { value: "true", label: "Actifs" },
              { value: "false", label: "Inactifs" },
            ]}
          />
        </div>
        <FiltersResultBar
          totalResults={total}
          hasActiveFilters={hasActiveFilters}
          onReset={handleResetFilters}
          resultText="formateur(s) trouvé(s)"
        />
      </div>

      {/* Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Liste des formateurs</CardTitle>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nouveau formateur
          </Button>
        </CardHeader>
        <CardContent>
          <InstructorsDataTable
            instructors={instructors}
            pagination={pagination}
            onEdit={handleEdit}
            onDelete={setToDelete}
            onPageChange={setPage}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Modals */}
      <CreateInstructorModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      <EditInstructorSheet
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelected(null);
        }}
        instructor={selected}
      />

      {/* Confirmation suppression */}
      <AlertDialog open={!!toDelete} onOpenChange={() => setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le formateur "
              {toDelete?.user.first_name} {toDelete?.user.last_name}" ? Cette
              action supprimera également son compte utilisateur et est
              irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
