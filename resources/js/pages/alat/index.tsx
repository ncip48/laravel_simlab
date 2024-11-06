import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { AlatType, columns } from "./columns";
import { AddAlat, DeleteAlat, EditAlat, ParameterAlat } from "./form";

function TableAlat({ columns, data }: { columns: any; data: any }) {
    return (
        <DataTable
            columns={columns}
            data={data}
            search="name"
            onDelete={(id) => <DeleteAlat id={id} />}
            onAdd={<AddAlat />}
            onEdit={(dx) => <EditAlat item={dx} />}
            leftAction={(dx) => <ParameterAlat item={dx} />}
        />
    );
}

export default function Alat({ items }: { items: AlatType }) {
    return (
        <AuthenticatedLayout header="Alat">
            <Head title="Alat" />

            <div className="">
                <Card>
                    <CardHeader>
                        <CardTitle>Alat</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <TableAlat columns={columns} data={items} />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
