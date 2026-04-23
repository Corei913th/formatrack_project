import { ColumnDef } from "@tanstack/react-table";
import { Instructor } from "@/modules/instructors";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/data-table/table";
import { PaginationMeta } from "@/types/api.type";
import { ActionsDropdown } from "@/components/data-table/actions-dropdown";
import { Edit, Trash2 } from "lucide-react";

interface InstructorsDataTableProps {
  instructors: Instructor[];
  pagination?: PaginationMeta;
  onEdit: (instructor: Instructor) => void;
  onDelete: (instructor: Instructor) => void;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function InstructorsDataTable({
  instructors,
  pagination,
  onEdit,
  onDelete,
  onPageChange,
  isLoading,
}: InstructorsDataTableProps) {
  const columns: ColumnDef<Instructor>[] = [
    {
      accessorKey: "user.last_name",
      header: "Formateur",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">
            {row.original.user.first_name} {row.original.user.last_name}
          </div>
          <div className="text-xs text-muted-foreground">
            {row.original.user.email}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "user.phone",
      header: "Téléphone",
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.user.phone || (
            <span className="text-muted-foreground">—</span>
          )}
        </span>
      ),
    },
    {
      accessorKey: "specialties",
      header: "Spécialités",
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.specialties || (
            <span className="text-muted-foreground">—</span>
          )}
        </span>
      ),
    },
    {
      accessorKey: "hourly_rate",
      header: "Taux horaire",
      cell: ({ row }) =>
        row.original.hourly_rate ? (
          <span className="text-sm font-medium">
            {parseFloat(row.original.hourly_rate).toFixed(2)} €/h
          </span>
        ) : (
          <span className="text-muted-foreground text-sm">—</span>
        ),
    },
    {
      accessorKey: "user.is_active",
      header: "Statut",
      cell: ({ row }) => (
        <Badge variant={row.original.user.is_active ? "default" : "secondary"}>
          {row.original.user.is_active ? "Actif" : "Inactif"}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <ActionsDropdown
          items={[
            {
              label: "Modifier",
              icon: Edit,
              onClick: () => onEdit(row.original),
            },
            {
              label: "Supprimer",
              icon: Trash2,
              onClick: () => onDelete(row.original),
              className: "text-destructive focus:text-destructive",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={instructors}
      serverSidePagination={!!pagination}
      total={pagination?.total ?? 0}
      page={pagination?.current_page ?? 1}
      limit={pagination?.per_page ?? 15}
      onPageChange={onPageChange}
      isLoading={isLoading}
    />
  );
}
