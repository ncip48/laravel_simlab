import { PasienType } from "../pasien/columns";

export type PemeriksaanType = {
    id?: number;
    blood_type: string | null;
    blood_bag: string | null;
    rhesus: number | null;
    patient: PasienType;
};
