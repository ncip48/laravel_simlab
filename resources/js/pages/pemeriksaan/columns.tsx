import { ColumnDef } from "@tanstack/react-table";
import { PasienType } from "../pasien/columns";
import { ExtendedColumnDef } from "../screening/antibody/columns";

export type PemeriksaanType = {
    id?: number;
    blood_type: string | null;
    blood_bag: string | null;
    rhesus: string | null;
    patient: PasienType;
};

export const columns: ExtendedColumnDef<PemeriksaanType, PemeriksaanType>[] = [
    {
        accessorKey: "#",
        header: "Pasien",
        childs: [
            {
                accessorKey: "patient_name",
                header: "Nama",
            },
            {
                accessorKey: "blood_bag",
                header: "No Kantong",
            },
        ],
    },
    {
        accessorKey: "blood_type",
        header: "Golongan Darah",
    },
    {
        accessorKey: "rhesus",
        header: "Rhesus",
    },
];
