import { ModalAction } from "@/components/modal-action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FormEventHandler, useEffect, useState } from "react";
import { ImltdType } from "./columns";
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

export function AddImltd() {
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
        hiv: "",
        nilai_hiv: "",
        hbsag: "",
        nilai_hbsag: "",
        hcv: "",
        nilai_hcv: "",
        tp: "",
        nilai_tp: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("imltd.store"), {
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
            title="Tambah IMLTD"
            description="Tambahkan data imltd disini"
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
            <div className="flex gap-3 items-end">
                <div>
                    <Label htmlFor="name">HIV</Label>
                    <SelectOption
                        title="Pilih Result"
                        items={Result}
                        value=""
                        onChange={(e) => setData("hiv", e)}
                    />

                    <InputError className="mt-1" message={errors.hiv} />
                </div>
                <div>
                    <Input
                        id="nilai_hiv"
                        className="mt-1 block w-full"
                        // value={data.name}
                        placeholder="Nilai (titer AB)"
                        onChange={(e) => setData("nilai_hiv", e.target.value)}
                        autoComplete="off"
                    />

                    <InputError className="mt-1" message={errors.nilai_hiv} />
                </div>
            </div>
            <div className="flex gap-3 items-end">
                <div>
                    <Label htmlFor="name">HbsAg</Label>
                    <SelectOption
                        title="Pilih Result"
                        items={Result}
                        value=""
                        onChange={(e) => setData("hbsag", e)}
                    />

                    <InputError className="mt-1" message={errors.hbsag} />
                </div>
                <div>
                    <Input
                        id="nilai_hbsag"
                        className="mt-1 block w-full"
                        // value={data.name}
                        placeholder="Nilai (titer AB)"
                        onChange={(e) => setData("nilai_hbsag", e.target.value)}
                        autoComplete="off"
                    />

                    <InputError className="mt-1" message={errors.nilai_hbsag} />
                </div>
            </div>
            <div className="flex gap-3 items-end">
                <div>
                    <Label htmlFor="name">HCV</Label>
                    <SelectOption
                        title="Pilih Result"
                        items={Result}
                        value=""
                        onChange={(e) => setData("hcv", e)}
                    />

                    <InputError className="mt-1" message={errors.hcv} />
                </div>
                <div>
                    <Input
                        id="nilai_hcv"
                        className="mt-1 block w-full"
                        // value={data.name}
                        placeholder="Nilai (titer AB)"
                        onChange={(e) => setData("nilai_hcv", e.target.value)}
                        autoComplete="off"
                    />

                    <InputError className="mt-1" message={errors.nilai_hcv} />
                </div>
            </div>
            <div className="flex gap-3 items-end">
                <div>
                    <Label htmlFor="name">TP</Label>
                    <SelectOption
                        title="Pilih Result"
                        items={Result}
                        value=""
                        onChange={(e) => setData("tp", e)}
                    />

                    <InputError className="mt-1" message={errors.tp} />
                </div>
                <div>
                    <Input
                        id="nilai_tp"
                        className="mt-1 block w-full"
                        // value={data.name}
                        placeholder="Nilai (titer AB)"
                        onChange={(e) => setData("nilai_tp", e.target.value)}
                        autoComplete="off"
                    />

                    <InputError className="mt-1" message={errors.nilai_tp} />
                </div>
            </div>
        </ModalAction>
    );
}

export function EditImltd({ item }: { item: ImltdType }) {
    const [open, setOpen] = useState(false);
    const { data, setData, patch, errors, processing, reset } = useForm({
        blood_bag: item.blood_bag,
        hiv: item.hiv,
        nilai_hiv: item.nilai_hiv,
        hbsag: item.hbsag,
        nilai_hbsag: item.nilai_hbsag,
        hcv: item.hcv,
        nilai_hcv: item.nilai_hcv,
        tp: item.tp,
        nilai_tp: item.nilai_tp,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("imltd.update", item.id), {
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
            title="Edit Imltd"
            isEdit
            description="Edit imltd disini."
            open={open}
            setOpen={setOpen}
        >
            <div>
                <Label htmlFor="name">No Kantong</Label>

                <Input
                    id="blood_bag"
                    className="mt-1 block w-full"
                    value={data.blood_bag}
                    onChange={(e) => setData("blood_bag", e.target.value)}
                    autoComplete="off"
                />

                <InputError className="mt-1" message={errors.blood_bag} />
            </div>
            <div className="flex gap-3 items-end">
                <div>
                    <Label htmlFor="name">HIV</Label>
                    <SelectOption
                        title="Pilih Result"
                        items={Result}
                        value={String(data.hiv)}
                        onChange={(e) => setData("hiv", e)}
                    />

                    <InputError className="mt-1" message={errors.hiv} />
                </div>
                <div>
                    <Input
                        id="nilai_hiv"
                        className="mt-1 block w-full"
                        value={data.nilai_hiv}
                        placeholder="Nilai (titer AB)"
                        onChange={(e) => setData("nilai_hiv", e.target.value)}
                        autoComplete="off"
                    />

                    <InputError className="mt-1" message={errors.nilai_hiv} />
                </div>
            </div>
            <div className="flex gap-3 items-end">
                <div>
                    <Label htmlFor="name">HbsAg</Label>
                    <SelectOption
                        title="Pilih Result"
                        items={Result}
                        value={String(data.hbsag)}
                        onChange={(e) => setData("hbsag", e)}
                    />

                    <InputError className="mt-1" message={errors.hbsag} />
                </div>
                <div>
                    <Input
                        id="nilai_hbsag"
                        className="mt-1 block w-full"
                        value={data.nilai_hbsag}
                        placeholder="Nilai (titer AB)"
                        onChange={(e) => setData("nilai_hbsag", e.target.value)}
                        autoComplete="off"
                    />

                    <InputError className="mt-1" message={errors.nilai_hbsag} />
                </div>
            </div>
            <div className="flex gap-3 items-end">
                <div>
                    <Label htmlFor="name">HCV</Label>
                    <SelectOption
                        title="Pilih Result"
                        items={Result}
                        value={String(data.hcv)}
                        onChange={(e) => setData("hcv", e)}
                    />

                    <InputError className="mt-1" message={errors.hcv} />
                </div>
                <div>
                    <Input
                        id="nilai_hcv"
                        className="mt-1 block w-full"
                        value={data.nilai_hcv}
                        placeholder="Nilai (titer AB)"
                        onChange={(e) => setData("nilai_hcv", e.target.value)}
                        autoComplete="off"
                    />

                    <InputError className="mt-1" message={errors.nilai_hcv} />
                </div>
            </div>
            <div className="flex gap-3 items-end">
                <div>
                    <Label htmlFor="name">TP</Label>
                    <SelectOption
                        title="Pilih Result"
                        items={Result}
                        value={String(data.tp)}
                        onChange={(e) => setData("tp", e)}
                    />

                    <InputError className="mt-1" message={errors.tp} />
                </div>
                <div>
                    <Input
                        id="nilai_tp"
                        className="mt-1 block w-full"
                        value={data.nilai_tp}
                        placeholder="Nilai (titer AB)"
                        onChange={(e) => setData("nilai_tp", e.target.value)}
                        autoComplete="off"
                    />

                    <InputError className="mt-1" message={errors.nilai_tp} />
                </div>
            </div>
        </ModalAction>
    );
}

export const DeleteImltd = ({ id }: { id: number }) => {
    const { delete: destroy, processing } = useForm();

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("imltd.destroy", id), {
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
