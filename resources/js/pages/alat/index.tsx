import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { columns, PasienType } from "./columns";
import { AddPasien, DeletePasien, EditPasien } from "./form";

function TablePasien({ columns, data }: { columns: any; data: any }) {
    return (
        <DataTable
            columns={columns}
            data={data}
            search="name"
            onDelete={(id) => <DeletePasien id={id} />}
            onAdd={<AddPasien />}
            onEdit={(dx) => <EditPasien item={dx} />}
        />
    );
}

export default function Pasien({ items }: { items: PasienType }) {
    return (
        <AuthenticatedLayout header="Alat">
            <Head title="Alat" />

            <div className="">
                <Card>
                    <CardHeader>
                        <CardTitle>Alat</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <TablePasien columns={columns} data={items} />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
