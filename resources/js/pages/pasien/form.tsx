import { ModalAction } from "@/components/modal-action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FormEventHandler, useState } from "react";
import { PasienType } from "./columns";
import { useForm } from "@inertiajs/react";
import { InputError } from "@/components/ui/input-error";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import LoadingDots from "@/components/loading-dots";
import { Trash2Icon } from "lucide-react";
import { toasterForm } from "@/lib/utils";

export function AddPasien() {
    const [open, setOpen] = useState(false);
    const { setData, post, errors, processing, recentlySuccessful, reset } =
        useForm({
            name: "",
            address: "",
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("pasien.store"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
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
                <Label htmlFor="name">Nama Pasien</Label>

                <Input
                    id="name"
                    className="mt-1 block w-full"
                    // value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    autoComplete="off"
                />

                <InputError className="mt-2" message={errors.name} />
            </div>
            <div>
                <Label htmlFor="name">Nama Pasien</Label>

                <Textarea
                    id="address"
                    className="mt-1 block w-full"
                    // value={data.address}
                    onChange={(e) => setData("address", e.target.value)}
                    autoComplete="off"
                />

                <InputError className="mt-2" message={errors.address} />
            </div>
        </ModalAction>
    );
}

export function EditPasien({ item }: { item: PasienType }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: item.name,
            address: item.address,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };
    return (
        <ModalAction
            submit={submit}
            processing={processing}
            title="Add Banner"
            isEdit
            description="Create a new banner with a unique name and username. This will
                    help identify the banner and its creator."
        >
            <div>
                <Label htmlFor="name">Nama Pasien</Label>

                <Input
                    id="name"
                    className="mt-1 block w-full"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                    autoComplete="name"
                />

                <InputError className="mt-2" message={errors.name} />
            </div>
            <div>
                <Label htmlFor="name">Nama Pasien</Label>

                <Textarea
                    id="name"
                    className="mt-1 block w-full"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                    autoComplete="name"
                />

                <InputError className="mt-2" message={errors.name} />
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
