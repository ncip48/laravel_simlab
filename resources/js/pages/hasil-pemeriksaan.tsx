import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ComboBox } from "@/components/combobox";
import { DatePicker } from "@/components/datepicker";
import { Button } from "@/components/ui/button";
import moment from "moment";

const items = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
];

export default function HasilPemeriksaan({
    alats,
    results,
}: {
    alats: { value: string; label: string }[];
    results: any[];
}) {
    const { props } = usePage<PageProps>();
    const alat = props.alat || ""; // default to an empty string if not present
    const tanggal = props.tanggal || moment().format("YYYY-MM-DD"); // default to an empty string if not present
    // console.log(alat, tanggal, props);
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            alat, // Initial value for alat
            tanggal, // Initial value for tanggal
        });

    const handleSearch = () => {
        post(route("hasil-pemeriksaan.search"), {});
    };

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
                    <CardContent>
                        <div className="flex gap-2 items-center">
                            <ComboBox
                                title="Pilih Alat"
                                items={alats}
                                value={data.alat}
                                onChange={(e) => setData("alat", e)}
                            />
                            <DatePicker
                                label="Pilih Tanggal"
                                // value={
                                //     moment(data.tanggal).format("YYYY-MM-DD") +
                                //     "T00:00:00.000Z"
                                // }
                                value={data.tanggal}
                                onChange={(date) => {
                                    // console.log("dari sl", date);
                                    const tgl =
                                        moment(date).format("YYYY-MM-DD");
                                    setData("tanggal", tgl);
                                }}
                            />
                            <Button
                                size="sm"
                                onClick={handleSearch}
                                disabled={processing || data.alat == ""}
                            >
                                Tampilkan
                            </Button>
                        </div>
                        <div className="gap-4 flex flex-col mt-4">
                            {results && results.length > 0 ? (
                                results.map((result, index) => (
                                    <Card key={index}>
                                        <CardHeader>
                                            <CardTitle>
                                                Pasien:{" "}
                                                {result?.patient?.name ?? "-"}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid gap-4">
                                            {/* TODO */}
                                            <small>Hasil Pemeriksaan</small>
                                            {result.parameters.map(
                                                (
                                                    param: any,
                                                    idxParam: number
                                                ) => {
                                                    return (
                                                        <small key={idxParam}>
                                                            {param.parameter}:{" "}
                                                            {param.value}
                                                        </small>
                                                    );
                                                }
                                            )}
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
