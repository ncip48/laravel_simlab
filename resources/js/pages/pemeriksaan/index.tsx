import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { columns, PemeriksaanType } from "./columns";
import { Button } from "@/components/ui/button";
import { ActivitySquareIcon } from "lucide-react";
import { DeletePemeriksaan } from "./form";

function TablePemeriksaan({ columns, data }: { columns: any; data: any }) {
    return (
        <DataTable
            columns={columns}
            data={data}
            search="patient_name"
            onDelete={(id) => <DeletePemeriksaan id={id} />}
            onAdd={<></>}
            onEdit={(dx) => <></>}
        />
    );
}

export default function Pemeriksaan({ items }: { items: PemeriksaanType }) {
    return (
        <AuthenticatedLayout header="Pemeriksaan">
            <Head title="Pemeriksaan" />

            <div className="">
                <Card>
                    <CardHeader>
                        <CardTitle>Pemeriksaan</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <TablePemeriksaan columns={columns} data={items} />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
