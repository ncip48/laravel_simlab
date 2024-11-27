import { ModalAction } from "@/components/modal-action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FormEventHandler, useEffect, useState } from "react";
import { PasienType } from "./columns";
import { useForm } from "@inertiajs/react";
import { InputError } from "@/components/ui/input-error";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import LoadingDots from "@/components/loading-dots";
import { Trash2Icon } from "lucide-react";
import { toasterForm } from "@/lib/utils";
import { ComboBox } from "@/components/combobox";
import axios from "axios";
import { SelectOption } from "@/components/select";

const JK = [
    {
        value: "L",
        label: "Laki-Laki",
    },
    {
        value: "P",
        label: "Perempuan",
    },
];

export function AddPasien() {
    const [open, setOpen] = useState(false);
    const [provinces, setProvinces] = useState([]);

    useEffect(() => {
        axios
            .get("/api/provinces")
            .then((response) => {
                setProvinces(
                    response.data.map((province: any) => ({
                        value: province.id,
                        label: province.name,
                    }))
                );
            })
            .catch((error) => {
                console.error("Error fetching provinces:", error);
            });
    }, []);

    const {
        data,
        setData,
        post,
        errors,
        processing,
        recentlySuccessful,
        reset,
    } = useForm({
        name: "",
        address: "",
        province_id: "",
        identity_number: "",
        post_code: "",
        gender: "",
        birth_date: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("pasien.store"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            // onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        toasterForm({ success: true, message: "Success" });
        reset();
        setOpen(false);
    };

    return (
        <ModalAction
            submit={submit}
            processing={processing}
            title="Tambah Pasien"
            description="Tambahkan data pasien disini"
            open={open}
            setOpen={setOpen}
        >
            <div>
                <Label htmlFor="name">NIK</Label>

                <Input
                    id="nik"
                    className="mt-1 block w-full"
                    // value={data.name}
                    onChange={(e) => setData("identity_number", e.target.value)}
                    autoComplete="off"
                />

                <InputError className="mt-1" message={errors.identity_number} />
            </div>
            <div>
                <Label htmlFor="name">Nama Pasien</Label>

                <Input
                    id="name"
                    className="mt-1 block w-full"
                    // value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    autoComplete="off"
                />

                <InputError className="mt-1" message={errors.name} />
            </div>
            {/* <div>
                <ComboBox
                    title="Pilih Provinsi"
                    items={provinces}
                    // value={data.province_id}
                    value=""
                    onChange={(e) => setData("province_id", e)}
                />
                <InputError className="mt-1" message={errors.province_id} />
            </div> */}
            {/* <SelectOption /> */}
            <div>
                <Label htmlFor="name">Kode Pos</Label>

                <Input
                    id="post_code"
                    className="mt-1 block w-full"
                    // value={data.name}
                    onChange={(e) => setData("post_code", e.target.value)}
                    autoComplete="off"
                />

                <InputError className="mt-1" message={errors.post_code} />
            </div>
            <div>
                <Label htmlFor="name">Jenis Kelamin</Label>
                <SelectOption
                    title="Jenis Kelamin"
                    items={JK}
                    value=""
                    onChange={(e) => setData("gender", e)}
                    wFull
                />
                <InputError className="mt-1" message={errors.gender} />
            </div>
            <div>
                <Label htmlFor="name">Tanggal Lahir</Label>

                <Input
                    type="date"
                    id="date"
                    className="mt-1 block w-full"
                    // value={data.name}
                    onChange={(e) => setData("birth_date", e.target.value)}
                    autoComplete="off"
                />

                <InputError className="mt-1" message={errors.birth_date} />
            </div>
            <div>
                <Label htmlFor="name">Alamat</Label>

                <Textarea
                    id="address"
                    className="mt-1 block w-full"
                    // value={data.address}
                    onChange={(e) => setData("address", e.target.value)}
                    autoComplete="off"
                />

                <InputError className="mt-1" message={errors.address} />
            </div>
        </ModalAction>
    );
}

export function EditPasien({ item }: { item: PasienType }) {
    const [open, setOpen] = useState(false);
    const { data, setData, patch, errors, processing, reset } = useForm({
        name: item.name,
        address: item.address,
        province_id: item.province_id,
        identity_number: item.identity_number,
        post_code: item.post_code,
        gender: item.gender,
        birth_date: item.birth_date,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("pasien.update", item.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            // onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        toasterForm({ success: true, message: "Success" });
        reset();
        setOpen(false);
    };
    return (
        <ModalAction
            submit={submit}
            processing={processing}
            title="Edit Pasien"
            isEdit
            description="Edit pasien disini."
            open={open}
            setOpen={setOpen}
        >
            <div>
                <Label htmlFor="name">NIK</Label>

                <Input
                    id="nik"
                    className="mt-1 block w-full"
                    defaultValue={item.identity_number || ""}
                    onChange={(e) => setData("identity_number", e.target.value)}
                    autoComplete="off"
                />

                <InputError className="mt-1" message={errors.identity_number} />
            </div>
            <div>
                <Label htmlFor="name">Nama Pasien</Label>

                <Input
                    id="name"
                    className="mt-1 block w-full"
                    defaultValue={item.name || ""}
                    onChange={(e) => setData("name", e.target.value)}
                    autoComplete="name"
                />

                <InputError className="mt-1" message={errors.name} />
            </div>
            <div>
                <Label htmlFor="name">Kode Pos</Label>

                <Input
                    id="post_code"
                    className="mt-1 block w-full"
                    defaultValue={item.post_code || ""}
                    onChange={(e) => setData("post_code", e.target.value)}
                    autoComplete="off"
                />

                <InputError className="mt-1" message={errors.post_code} />
            </div>
            <div>
                <Label htmlFor="name">Jenis Kelamin</Label>
                <SelectOption
                    title="Jenis Kelamin"
                    items={JK}
                    value={item.gender}
                    onChange={(e) => setData("gender", e)}
                    wFull
                />
                <InputError className="mt-1" message={errors.gender} />
            </div>
            <div>
                <Label htmlFor="name">Tanggal Lahir</Label>

                <Input
                    type="date"
                    id="date"
                    className="mt-1 block w-full"
                    defaultValue={item.birth_date || ""}
                    onChange={(e) => setData("birth_date", e.target.value)}
                    autoComplete="off"
                />

                <InputError className="mt-1" message={errors.birth_date} />
            </div>
            <div>
                <Label htmlFor="name">Alamat Pasien</Label>

                <Textarea
                    id="address"
                    className="mt-1 block w-full"
                    defaultValue={item.address || ""}
                    onChange={(e) => setData("address", e.target.value)}
                    autoComplete="address"
                />

                <InputError className="mt-1" message={errors.address} />
            </div>
        </ModalAction>
    );
}

export const DeletePasien = ({ id }: { id: number }) => {
    const { delete: destroy, processing } = useForm();

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("pasien.destroy", id), {
            preserveScroll: true,
            // onSuccess: () => closeModal(),
            onError: () => toasterForm({ success: false, message: "Error" }),
            // onFinish: () => reset(),
        });
    };

    return (
        <form onSubmit={deleteUser}>
            <Button
                disabled={processing}
                variant={processing ? "outline" : "destructive"}
                size="sm"
            >
                {processing ? <LoadingDots /> : <Trash2Icon />}
            </Button>
        </form>
    );
};
