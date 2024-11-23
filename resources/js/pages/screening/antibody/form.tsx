import { ModalAction } from "@/components/modal-action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FormEventHandler, useEffect, useState } from "react";
import { AntibodyType } from "./columns";
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

const Result = [
    {
        value: "0",
        label: "Negatif",
    },
    {
        value: "1",
        label: "Positif",
    },
];

export function AddAntibody() {
    const [open, setOpen] = useState(false);

    const {
        data,
        setData,
        post,
        errors,
        processing,
        recentlySuccessful,
        reset,
    } = useForm({
        blood_bag: "",
        p1: "0",
        p2: "0",
        p3: "0",
        p4: "0",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("antibody.store"), {
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
            title="Tambah Antibody"
            description="Tambahkan data antibody disini"
            open={open}
            setOpen={setOpen}
        >
            <div>
                <Label htmlFor="name">No Kantong</Label>

                <Input
                    id="blood_bag"
                    className="mt-1 block w-full"
                    // value={data.name}
                    onChange={(e) => setData("blood_bag", e.target.value)}
                    autoComplete="off"
                />

                <InputError className="mt-1" message={errors.blood_bag} />
            </div>
            <div>
                <Label htmlFor="name">P1</Label>
                <SelectOption
                    items={Result}
                    value=""
                    onChange={(e) => setData("p1", e)}
                    wFull
                />

                <InputError className="mt-1" message={errors.p1} />
            </div>
            <div>
                <Label htmlFor="name">P2</Label>
                <SelectOption
                    items={Result}
                    value=""
                    onChange={(e) => setData("p2", e)}
                    wFull
                />

                <InputError className="mt-1" message={errors.p2} />
            </div>
            <div>
                <Label htmlFor="name">P3</Label>
                <SelectOption
                    items={Result}
                    value=""
                    onChange={(e) => setData("p3", e)}
                    wFull
                />

                <InputError className="mt-1" message={errors.p3} />
            </div>
            <div>
                <Label htmlFor="name">P4</Label>
                <SelectOption
                    items={Result}
                    value=""
                    onChange={(e) => setData("p4", e)}
                    wFull
                />

                <InputError className="mt-1" message={errors.p4} />
            </div>
        </ModalAction>
    );
}

export function EditAntibody({ item }: { item: AntibodyType }) {
    const [open, setOpen] = useState(false);
    const { data, setData, patch, errors, processing, reset } = useForm({
        blood_bag: item.blood_bag,
        p1: item.p1,
        p2: item.p2,
        p3: item.p3,
        p4: item.p4,
    });

    // console.log(data);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("antibody.update", item.id), {
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
            title="Edit Antibody"
            isEdit
            description="Edit antibody disini."
            open={open}
            setOpen={setOpen}
        >
            <div>
                <Label htmlFor="name">No Kantong</Label>

                <Input
                    id="blood_bag"
                    className="mt-1 block w-full"
                    defaultValue={item.blood_bag}
                    onChange={(e) => setData("blood_bag", e.target.value)}
                    autoComplete="off"
                />

                <InputError className="mt-1" message={errors.blood_bag} />
            </div>
            <div>
                <Label htmlFor="name">P1</Label>
                <SelectOption
                    items={Result}
                    value={String(data.p1)}
                    onChange={(e) => setData("p1", e)}
                    wFull
                />

                <InputError className="mt-1" message={errors.p1} />
            </div>
            <div>
                <Label htmlFor="name">P2</Label>
                <SelectOption
                    items={Result}
                    value={String(data.p2)}
                    onChange={(e) => setData("p2", e)}
                    wFull
                />

                <InputError className="mt-1" message={errors.p2} />
            </div>
            <div>
                <Label htmlFor="name">P3</Label>
                <SelectOption
                    items={Result}
                    value={String(data.p3)}
                    onChange={(e) => setData("p3", e)}
                    wFull
                />

                <InputError className="mt-1" message={errors.p3} />
            </div>
            <div>
                <Label htmlFor="name">P4</Label>
                <SelectOption
                    items={Result}
                    value={String(data.p4)}
                    onChange={(e) => setData("p4", e)}
                    wFull
                />

                <InputError className="mt-1" message={errors.p4} />
            </div>
        </ModalAction>
    );
}

export const DeleteAntibody = ({ id }: { id: number }) => {
    const { delete: destroy, processing } = useForm();

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("antibody.destroy", id), {
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
