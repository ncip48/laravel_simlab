"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PasienType = {
    id?: number;
    name: string | null;
    address: string | null;
    province_id: number | null;
    identity_number: string | null;
    post_code: string | null;
    gender: string | null;
    birth_date: string | null;
    jk_string: string | null;
    age: string | null;
};

export type FormPemeriksaanType = {
    id: number;
    patient_id: number;
    blood_type: string | null;
    blood_bag: string | null;
    rhesus: string | null;
};

export const columns: ColumnDef<PasienType>[] = [
    {
        accessorKey: "identity_number",
        header: "NIK",
    },
    {
        accessorKey: "name",
        header: "Nama",
    },
    {
        accessorKey: "jk_string",
        header: "Jenis Kelamin",
    },
    {
        accessorKey: "birth_date",
        header: "Tgl Lahir",
    },
    {
        accessorKey: "age",
        header: "Usia",
    },
    {
        accessorKey: "address_full",
        header: "Alamat",
    },
];
