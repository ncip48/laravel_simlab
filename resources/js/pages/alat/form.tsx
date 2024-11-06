import { ModalAction } from "@/components/modal-action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FormEventHandler, useState } from "react";
import { useForm } from "@inertiajs/react";
import { InputError } from "@/components/ui/input-error";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import LoadingDots from "@/components/loading-dots";
import { Trash2Icon } from "lucide-react";
import { toasterForm } from "@/lib/utils";
import { AlatType } from "./columns";

export function AddAlat() {
    const [open, setOpen] = useState(false);
    const { setData, post, errors, processing, recentlySuccessful, reset } =
        useForm({
            name: "",
            folder: "",
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("alat.store"), {
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
            formData
            submit={submit}
            processing={processing}
            title="Tambah Alat"
            description="Tambahkan data alat disini"
            open={open}
            setOpen={setOpen}
        >
            <div>
                <Label htmlFor="name">Nama Alat</Label>

                <Input
                    id="name"
                    className="mt-1 block w-full"
                    // value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    autoComplete="off"
                />

                <InputError className="mt-1" message={errors.name} />
            </div>
            <div>
                <Label htmlFor="name">Folder</Label>

                <Input
                    type="type"
                    id="folder"
                    className="mt-1 block w-full"
                    // value={data.name}
                    onChange={(e) => {
                        setData("folder", e.target.value);
                    }}
                    autoComplete="off"
                />

                <InputError className="mt-1" message={errors.folder} />
            </div>
        </ModalAction>
    );
}

export function EditAlat({ item }: { item: AlatType }) {
    const [open, setOpen] = useState(false);
    const { data, setData, patch, errors, processing, reset } = useForm({
        name: item.name,
        folder: item.folder,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("alat.update", item.id), {
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
            title="Add Banner"
            isEdit
            description="Create a new banner with a unique name and username. This will
                    help identify the banner and its creator."
            open={open}
            setOpen={setOpen}
        >
            <div>
                <Label htmlFor="name">Nama Alat</Label>

                <Input
                    id="name"
                    className="mt-1 block w-full"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    autoComplete="off"
                />

                <InputError className="mt-1" message={errors.name} />
            </div>
            <div>
                <Label htmlFor="name">Folder</Label>

                <Input
                    type="type"
                    id="folder"
                    className="mt-1 block w-full"
                    value={data.folder}
                    onChange={(e) => {
                        setData("folder", e.target.value);
                    }}
                    autoComplete="off"
                />

                <InputError className="mt-1" message={errors.folder} />
            </div>
        </ModalAction>
    );
}

export const DeleteAlat = ({ id }: { id: number }) => {
    const { delete: destroy, processing } = useForm();

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("alat.destroy", id), {
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
