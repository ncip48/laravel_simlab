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

export const columns: ColumnDef<ImltdType>[] = [
    {
        accessorKey: "blood_bag",
        header: "No Kantong",
    },
    {
        accessorKey: "hiv_string",
        header: "HIV",
    },
    {
        accessorKey: "hbsag_string",
        header: "HbSAg",
    },
    {
        accessorKey: "hcv_string",
        header: "HCV",
    },
    {
        accessorKey: "tp_string",
        header: "TP",
    },
    {
        accessorKey: "pemeriksa",
        header: "Pemeriksa",
    },
];
