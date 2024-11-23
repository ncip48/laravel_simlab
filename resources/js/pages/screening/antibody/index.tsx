import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { columns, AntibodyType } from "./columns";
import { AddAntibody, EditAntibody, DeleteAntibody } from "./form";

function TableAntibody({ columns, data }: { columns: any; data: any }) {
    return (
        <DataTable
            columns={columns}
            data={data}
            search="blood_bag"
            onDelete={(id) => <DeleteAntibody id={id} />}
            onAdd={<AddAntibody />}
            onEdit={(dx) => <EditAntibody item={dx} />}
        />
    );
}

export default function Antibody({ items }: { items: AntibodyType }) {
    return (
        <AuthenticatedLayout header="Antibody">
            <Head title="Antibody" />

            <div className="">
                <Card>
                    <CardHeader>
                        <CardTitle>Antibody</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <TableAntibody columns={columns} data={items} />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
