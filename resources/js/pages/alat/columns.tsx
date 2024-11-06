"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AlatType = {
    id: number;
    name: string | null;
    folder: string | null;
    header: string | null;
};

export const columns: ColumnDef<AlatType>[] = [
    {
        accessorKey: "name",
        header: "Nama",
    },
    {
        accessorKey: "folder",
        header: "Folder",
    },
    {
        accessorKey: "parameter",
        header: "Parameter",
    },
];
