import { useState } from "react";
import { PageHeader } from "@/components/pageHeader";
import { FadeIn } from "@/components/animate/fade-in";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserStaff } from '@/modules/users'
import { UsersStaffDataTable } from "./components/users-staff-data-table";
import { CreateUserStaffModal } from "./modals/create-user-staff-modal";
import { EditUserStaffSheet } from "./modals/edit-user-staff-sheet";
import { SearchFilter } from "@/components/filters/search-filter";
import { StatusFilter } from "@/components/filters/status-filter";
import { FiltersResultBar } from "@/components/common/filters-result-bar";
import { Plus, Users, UserCheck, UserX } from "lucide-react";
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
import { useUsersStaffPage } from "./hooks/use-users-staff-page";

export default function UsersStaffPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserStaff | null>(null);
  const [userToDelete, setUserToDelete] = useState<UserStaff | null>(null);

  const {
    users,
    pagination,
    totalUsers,
    actifs,
    inactifs,
    filters,
    hasActiveFilters,
    handleSearch,
    handleStatusFilter,
    handleResetFilters,
    setPage,
    isLoading,
    handleDelete: deleteUser,
  } = useUsersStaffPage();

  const handleEdit = (user: UserStaff) => {
    setSelectedUser(user);
    setIsEditSheetOpen(true);
  };

  const handleDeleteClick = (user: UserStaff) => {
    setUserToDelete(user);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    await deleteUser(userToDelete.id);
    setUserToDelete(null);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <FadeIn direction="down" duration={0.3}>
        <div className="flex items-center gap-4">
          <Users className="h-8 w-8" />
          <PageHeader
            title="Gestion des utilisateurs"
            subtitle="Gérez les administrateurs, responsables de centres et correcteurs"
          />
        </div>
      </FadeIn>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Utilisateurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">Comptes staff</p>
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
            value={filters.is_active === undefined ? "all" : filters.is_active ? "true" : "false"}
            onValueChange={handleStatusFilter}
            options={[
              { value: "all", label: "Tous les statuts" },
              { value: "true", label: "Actifs" },
              { value: "false", label: "Inactifs" },
            ]}
          />
        </div>

        <FiltersResultBar
          totalResults={totalUsers}
          hasActiveFilters={hasActiveFilters}
          onReset={handleResetFilters}
          resultText="utilisateur(s) trouvé(s)"
        />
      </div>

      {/* Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Liste des utilisateurs</CardTitle>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvel utilisateur
          </Button>
        </CardHeader>
        <CardContent>
          <UsersStaffDataTable
            users={users}
            pagination={pagination}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onPageChange={setPage}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Modals */}
      <CreateUserStaffModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <EditUserStaffSheet
        isOpen={isEditSheetOpen}
        onClose={() => {
          setIsEditSheetOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />

      {/* Delete confirmation */}
      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer l'utilisateur "{userToDelete?.email}" ?
              Cette action est irréversible.
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
