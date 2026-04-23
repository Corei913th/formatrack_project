import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

// Étendre le type ColumnMeta pour inclure nos propriétés personnalisées
declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    className?: string;
    styles?: React.CSSProperties;
  }
}

type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  // Props pour pagination côté serveur
  serverSidePagination?: boolean;
  total?: number;
  page?: number;
  limit?: number;
  onPageChange?: (page: number) => void;
};

export function DataTable<T>({
  data,
  columns: initialColumns,
  isLoading = false,
  serverSidePagination = false,
  total = 0,
  page = 1,
  limit = 10,
  onPageChange
}: DataTableProps<T>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns: ColumnDef<T>[] = React.useMemo(() => {
    return [
      {
        id: "select",
        header: ({ table }) => (
          <div className="flex items-center">
            <Checkbox
              checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Sélectionner tout"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Sélectionner la ligne"
            />
          </div>
        ),
        meta: {
          className: "w-8",
        },
        enableSorting: false,
        enableHiding: false,
      },
      ...initialColumns,
    ];
  }, [initialColumns]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: serverSidePagination
        ? { pageIndex: page - 1, pageSize: limit }
        : pagination,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: serverSidePagination ? undefined : setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: serverSidePagination ? undefined : getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    // Pour la pagination côté serveur
    manualPagination: serverSidePagination,
    pageCount: serverSidePagination ? Math.ceil(total / limit) : undefined,
  });

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-lg border bg-card">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const className = header.column.columnDef.meta?.className;
                  const style = header.column.columnDef.meta?.styles;

                  return (
                    <TableHead key={header.id} colSpan={header.colSpan} className={className} style={style}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="**:data-[slot=table-cell]:first:w-8">
            {isLoading ? (
              Array.from({ length: pagination.pageSize }).map((_, index) => (
                <TableRow key={`skeleton-row-${index}`}>
                  {columns.map((column, cellIndex) => {
                    const className = column.meta?.className;
                    const style = column.meta?.styles;

                    return (
                      <TableCell key={`skeleton-cell-${index}-${cellIndex}`} className={className} style={style}>
                        <Skeleton className="h-8 w-full" />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => {
                    const className = cell.column.columnDef.meta?.className;
                    const style = cell.column.columnDef.meta?.styles;

                    return (
                      <TableCell key={cell.id} className={className} style={style}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
          {serverSidePagination
            ? `${((page - 1) * limit) + 1}-${Math.min(page * limit, total)} sur ${total} résultat(s)`
            : `${table.getFilteredSelectedRowModel().rows.length} sur ${table.getFilteredRowModel().rows.length} ligne(s) sélectionnée(s)`
          }.
        </div>

        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Lignes par page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="w-20" id="rows-per-page">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {serverSidePagination ? page : table.getState().pagination.pageIndex + 1} sur {serverSidePagination ? Math.ceil(total / limit) : table.getPageCount()}
          </div>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => serverSidePagination ? onPageChange?.(1) : table.setPageIndex(0)}
              disabled={serverSidePagination ? page <= 1 : !table.getCanPreviousPage()}
            >
              <span className="sr-only">Aller à la première page</span>
              <ChevronsLeftIcon />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => serverSidePagination ? onPageChange?.(page - 1) : table.previousPage()}
              disabled={serverSidePagination ? page <= 1 : !table.getCanPreviousPage()}
            >
              <span className="sr-only">Aller à la page précédente</span>
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => serverSidePagination ? onPageChange?.(page + 1) : table.nextPage()}
              disabled={serverSidePagination ? page >= Math.ceil(total / limit) : !table.getCanNextPage()}
            >
              <span className="sr-only">Aller à la page suivante</span>
              <ChevronRightIcon />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => serverSidePagination ? onPageChange?.(Math.ceil(total / limit)) : table.setPageIndex(table.getPageCount() - 1)}
              disabled={serverSidePagination ? page >= Math.ceil(total / limit) : !table.getCanNextPage()}
            >
              <span className="sr-only">Aller à la dernière page</span>
              <ChevronsRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
