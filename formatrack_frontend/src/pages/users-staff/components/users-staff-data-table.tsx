import { ColumnDef } from "@tanstack/react-table";
import { UserStaff } from '@/modules/users';
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/data-table/table";
import { USER_ROLE_LABELS } from '@/modules/users';
import { Edit, Trash2 } from "lucide-react";
import { PaginationMeta } from "@/types/api.type";
import { ActionsDropdown } from "@/components/data-table/actions-dropdown";
import { Button } from "@/components/ui/button";

interface UsersStaffDataTableProps {
  users: UserStaff[];
  pagination?: PaginationMeta;
  onEdit: (user: UserStaff) => void;
  onDelete: (user: UserStaff) => void;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function UsersStaffDataTable({
  users,
  pagination,
  onEdit,
  onPageChange,
  isLoading,
}: UsersStaffDataTableProps) {
  const columns: ColumnDef<UserStaff>[] = [
    {
      accessorKey: "last_name",
      header: "Nom complet",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">
            {row.original.first_name} {row.original.last_name}
          </div>
          {row.original.email && (
            <div className="text-xs text-muted-foreground">{row.original.email}</div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Rôle",
      cell: ({ row }) => (
        <Badge variant="outline">
          {USER_ROLE_LABELS[row.original.role]}
        </Badge>
      ),
    },
    {
      accessorKey: "phone",
      header: "Téléphone",
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.phone || <span className="text-muted-foreground">-</span>}
        </span>
      ),
    },
    {
      accessorKey: "is_active",
      header: "Statut",
      cell: ({ row }) => (
        <Badge variant={row.original.is_active ? "default" : "secondary"}>
          {row.original.is_active ? "Actif" : "Inactif"}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(row.original)}
            className="h-8 px-2"
          >
            <Edit className="h-4 w-4 mr-1" />
            Modifier
          </Button>
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
                onClick: () => { },
                className: "text-destructive focus:text-destructive",
              },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={users}
      serverSidePagination={!!pagination}
      total={pagination?.total || 0}
      page={pagination?.current_page || 1}
      limit={pagination?.per_page || 15}
      onPageChange={onPageChange}
      isLoading={isLoading}
    />
  );
}
