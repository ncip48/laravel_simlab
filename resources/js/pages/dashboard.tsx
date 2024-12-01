import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Stats from "@/components/stats";
import { Droplets, Users } from "lucide-react";
import { PieChart } from "@/components/pie-chart";

export default function Dashboard({
    jumlahPasien,
    jumlahKantong,
}: {
    jumlahPasien: number;
    jumlahKantong: number;
}) {
    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard" />

            <div className="flex flex-1 flex-col gap-4 h-full">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Stats
                        title="Jumlah Pasien"
                        value={jumlahPasien.toString()}
                        icon={Users}
                    />
                    <Stats
                        title="Jumlah Kantong Darah"
                        value={jumlahKantong.toString()}
                        icon={Droplets}
                    />
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <PieChart />
                </div>
                <div className="flex-1 rounded-xl bg-muted/50 h-full" />
            </div>
        </AuthenticatedLayout>
    );
}
