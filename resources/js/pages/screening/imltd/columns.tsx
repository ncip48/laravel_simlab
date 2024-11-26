"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ImltdType = {
    id: number;
    blood_bag: string;
    hiv: string;
    nilai_hiv: string;
    hbsag: string;
    nilai_hbsag: string;
    hcv: string;
    nilai_hcv: string;
    tp: string;
    nilai_tp: string;
};

interface ExtendedColumnDef<TData, TValue>
    extends Omit<ColumnDef<TData, TValue>, "childs"> {
    accessorKey: string;
    childs?: ExtendedColumnDef<TData, TValue>[];
}

export const columns: ExtendedColumnDef<ImltdType, any>[] = [
    {
        accessorKey: "blood_bag",
        header: "No Kantong",
    },
    {
        accessorKey: "#",
        header: "HIV",
        childs: [
            { accessorKey: "nilai_hiv", header: "Nilai" },
            { accessorKey: "hiv_range", header: "Range" },
            { accessorKey: "hiv_string", header: "Result" },
        ],
    },
    {
        accessorKey: "hbsag",
        header: "HbSAg",
        childs: [
            { accessorKey: "nilai_hbsag", header: "Nilai" },
            { accessorKey: "hbsag_range", header: "Range" },
            { accessorKey: "hbsag_string", header: "Result" },
        ],
    },
    {
        accessorKey: "hcv",
        header: "HCV",
        childs: [
            { accessorKey: "nilai_hcv", header: "Nilai" },
            { accessorKey: "hcv_range", header: "Range" },
            { accessorKey: "hcv_string", header: "Result" },
        ],
    },
    {
        accessorKey: "tp",
        header: "TP",
        childs: [
            { accessorKey: "nilai_tp", header: "Nilai" },
            { accessorKey: "tp_range", header: "Range" },
            { accessorKey: "tp_string", header: "Result" },
        ],
    },
    {
        accessorKey: "pemeriksa",
        header: "Pemeriksa",
    },
];
