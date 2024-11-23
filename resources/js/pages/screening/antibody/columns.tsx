"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AntibodyType = {
    id: number;
    blood_bag: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    nilai_tp: string;
};

interface ExtendedColumnDef<TData, TValue>
    extends Omit<ColumnDef<TData, TValue>, "childs"> {
    accessorKey: string;
    childs?: ExtendedColumnDef<TData, TValue>[];
}

export const columns: ExtendedColumnDef<AntibodyType, any>[] = [
    {
        accessorKey: "blood_bag",
        header: "No Kantong",
    },
    {
        accessorKey: "#",
        header: "Pemeriksaan",
        childs: [
            { accessorKey: "p1_string", header: "P1" },
            { accessorKey: "p2_string", header: "P2" },
            { accessorKey: "p3_string", header: "P3" },
            { accessorKey: "p4_string", header: "P4" },
        ],
    },
    {
        accessorKey: "result",
        header: "Result",
    },
    {
        accessorKey: "pemeriksa",
        header: "Pemeriksa",
    },
];
