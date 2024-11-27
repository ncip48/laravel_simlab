import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { ActivitySquareIcon, Droplets, Syringe } from "lucide-react";
import { BLOOD_TYPE, FormPemeriksaan, RHESUS } from "./form";
import { PasienType } from "../pasien/columns";
import { PemeriksaanType } from "./columns";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function Pemeriksaan({
    items,
    patient,
}: {
    items: PemeriksaanType[];
    patient: PasienType;
}) {
    return (
        <AuthenticatedLayout header="Pemeriksaan">
            <Head title="Pemeriksaan" />
            <div className="flex flex-col gap-3 md:flex-row">
                <div className="flex-auto w-full md:w-1/2 h-fit">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Pasien ({patient.identity_number})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium w-32 pl-0">
                                            Nama
                                        </TableCell>
                                        <TableCell className="w-1">:</TableCell>
                                        <TableCell>{patient.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium pl-0">
                                            Jenis Kelamin
                                        </TableCell>
                                        <TableCell>:</TableCell>
                                        <TableCell>
                                            {patient.jk_string}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium pl-0">
                                            Usia
                                        </TableCell>
                                        <TableCell>:</TableCell>
                                        <TableCell>{patient.age}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card className="mt-3">
                        <CardContent className="grid gap-4">
                            <FormPemeriksaan patient={patient} />
                        </CardContent>
                    </Card>
                </div>
                <Card className="flex-auto w-full md:w-1/2">
                    <CardHeader>
                        <CardTitle>History Pemeriksaan</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="gap-4 flex flex-col mt-4">
                            {items && items.length > 0 ? (
                                items.map((item, index) => (
                                    <Card key={index}>
                                        <CardHeader>
                                            <CardTitle>
                                                {item.blood_bag ?? "-"}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid gap-1">
                                            <Table>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell className="font-medium w-40 p-0 py-2">
                                                            <div className="flex items-center gap-2">
                                                                <Droplets />
                                                                Golongan Darah
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="w-1 p-0 px-3">
                                                            :
                                                        </TableCell>
                                                        <TableCell className="p-0">
                                                            {
                                                                BLOOD_TYPE.filter(
                                                                    (val) =>
                                                                        val.value ==
                                                                        item.blood_type
                                                                )[0]?.label
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="font-medium p-0 py-2">
                                                            <div className="flex items-center gap-2">
                                                                <Syringe />
                                                                Rhesus
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="p-0 px-3">
                                                            :
                                                        </TableCell>
                                                        <TableCell className="p-0">
                                                            {
                                                                RHESUS.filter(
                                                                    (val) =>
                                                                        val.value ==
                                                                        item.rhesus
                                                                )[0].label
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <p className="text-muted">No results found.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
