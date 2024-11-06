import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function HasilPemeriksaan() {
    return (
        <AuthenticatedLayout header="Hasil Pemeriksaan">
            <Head title="Hasil Pemeriksaan" />

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Hasil Pemeriksaan</CardTitle>
                        <CardDescription>
                            Pilih alat, tanggal untuk menampilkan hasil
                            pemeriksaan pasien
                        </CardDescription>
                    </CardHeader>
                    <CardContent></CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
