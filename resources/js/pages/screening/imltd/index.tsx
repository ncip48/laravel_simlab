import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { columns, ImltdType } from "./columns";
import { AddImltd, DeletePasien, EditImltd } from "./form";
import { Button } from "@/components/ui/button";
import { ActivitySquareIcon } from "lucide-react";

function TableImltd({ columns, data }: { columns: any; data: any }) {
    return (
        <DataTable
            columns={columns}
            data={data}
            search="blood_bag"
            onDelete={(id) => <DeletePasien id={id} />}
            onAdd={<AddImltd />}
            onEdit={(dx) => <EditImltd item={dx} />}
        />
    );
}

export default function Imltd({ items }: { items: ImltdType }) {
    return (
        <AuthenticatedLayout header="IMLTD">
            <Head title="IMLTD" />

            <div className="">
                <Card>
                    <CardHeader>
                        <CardTitle>IMLTD</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <TableImltd columns={columns} data={items} />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}