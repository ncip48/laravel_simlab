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
        accessorKey: "#",
        header: "HIV",
        childs: [
            { accessorKey: "hiv_string", header: "Result" },
            { accessorKey: "nilai_hiv", header: "Nilai (titer AB)" },
        ],
    },
    {
        accessorKey: "hbsag",
        header: "HbSAg",
        childs: [
            { accessorKey: "hbsag_string", header: "Result" },
            { accessorKey: "nilai_hbsag", header: "Nilai (titer AB)" },
        ],
    },
    {
        accessorKey: "hcv",
        header: "HCV",
        childs: [
            { accessorKey: "hcv_string", header: "Result" },
            { accessorKey: "nilai_hcv", header: "Nilai (titer AB)" },
        ],
    },
    {
        accessorKey: "tp",
        header: "TP",
        childs: [
            { accessorKey: "tp_string", header: "Result" },
            { accessorKey: "nilai_tp", header: "Nilai (titer AB)" },
        ],
    },
    {
        accessorKey: "pemeriksa",
        header: "Pemeriksa",
    },
];
