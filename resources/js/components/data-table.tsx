"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    HeaderContext,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

// Extend the ColumnDef interface to include the 'childs' and 'accessorKey' properties
interface ExtendedColumnDef<TData, TValue>
    extends Omit<ColumnDef<TData, TValue>, "childs"> {
    accessorKey: string;
    childs?: ExtendedColumnDef<TData, TValue>[];
}

interface DataTableProps<TData extends { id: number }, TValue> {
    columns: ExtendedColumnDef<TData, TValue>[];
    data: TData[];
    search: string;
    onDelete: (id: number) => React.ReactNode;
    onAdd: React.ReactNode;
    onEdit: (item: any) => React.ReactNode;
    leftAction?: (item: any) => React.ReactNode;
}

export function DataTable<TData extends { id: number }, TValue>({
    columns,
    data,
    search,
    onDelete,
    onAdd,
    onEdit,
    leftAction,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns: columns as ColumnDef<TData, any>[],
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
    });

    return (
        <div>
            <div className="flex items-center py-4 gap-2 justify-between">
                <Input
                    placeholder="Cari data..."
                    value={
                        (table.getColumn(search)?.getFilterValue() as string) ??
                        ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn(search)
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                {onAdd}
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {/* Render parent headers */}
                                <TableHead rowSpan={2} className="border">
                                    #
                                </TableHead>
                                {headerGroup.headers.map((header) => {
                                    const columnDef = header.column
                                        .columnDef as ExtendedColumnDef<
                                        TData,
                                        TValue
                                    >;
                                    if (columnDef.childs) {
                                        return (
                                            <TableHead
                                                key={header.id}
                                                colSpan={
                                                    columnDef.childs.length
                                                }
                                                className="text-center border"
                                            >
                                                {flexRender(
                                                    columnDef.header,
                                                    header.getContext() as HeaderContext<
                                                        TData,
                                                        TValue
                                                    >
                                                )}
                                            </TableHead>
                                        );
                                    } else {
                                        return (
                                            <TableHead
                                                key={header.id}
                                                rowSpan={2}
                                                className="border"
                                            >
                                                {typeof columnDef.header ===
                                                "function"
                                                    ? columnDef.header(
                                                          header.getContext() as HeaderContext<
                                                              TData,
                                                              TValue
                                                          >
                                                      )
                                                    : columnDef.header}
                                            </TableHead>
                                        );
                                    }
                                })}
                                <TableHead rowSpan={2} className="border">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        ))}

                        {/* Render child headers */}
                        <TableRow>
                            {columns
                                .filter((column) => column.childs)
                                .flatMap((column) =>
                                    column.childs!.map((child) => (
                                        <TableHead
                                            key={child.accessorKey}
                                            className="border"
                                        >
                                            {child.header as any}
                                        </TableHead>
                                    ))
                                )}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, idx) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {/* Render the row index */}
                                    <TableCell className="border">
                                        {idx + 1}
                                    </TableCell>

                                    {/* Render cells */}
                                    {columns.map((column) => {
                                        if (column.childs) {
                                            // Render each child as a separate <td>
                                            return column.childs.map(
                                                (child) => (
                                                    <TableCell
                                                        key={`${column.accessorKey}-${child.accessorKey}`}
                                                        className="text-center border"
                                                    >
                                                        {
                                                            (
                                                                row.original as Record<
                                                                    string,
                                                                    any
                                                                >
                                                            )[child.accessorKey]
                                                        }
                                                    </TableCell>
                                                )
                                            );
                                        } else {
                                            // Render regular column values
                                            return (
                                                <TableCell
                                                    key={column.accessorKey}
                                                    className="border"
                                                >
                                                    {
                                                        (
                                                            row.original as Record<
                                                                string,
                                                                any
                                                            >
                                                        )[column.accessorKey]
                                                    }
                                                </TableCell>
                                            );
                                        }
                                    })}

                                    {/* Render action buttons */}
                                    <TableCell className="flex gap-1">
                                        {leftAction &&
                                            leftAction(data[Number(row.id)])}
                                        {onEdit(data[Number(row.id)])}
                                        {onDelete(data[Number(row.id)]?.id)}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + 2} // Adjust for index and action columns
                                    className="h-24 text-center"
                                >
                                    Tidak ada data.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between px-2 mt-4">
                <div className="flex-1 text-sm text-muted-foreground"></div>
                <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex items-center space-x-2"></div>
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                    <div className="flex items-center space-x-2">
                        {/* <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to first page</span>
                        </Button> */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span>Previous</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span>Next</span>
                        </Button>
                        {/* <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() =>
                                table.setPageIndex(table.getPageCount() - 1)
                            }
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to last page</span>
                        </Button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
