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
import TextInput from "@/components/text-input";
import { PopupDelete } from "@/components/popup-delete";

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
        nilai_hiv: "",
        nilai_hbsag: "",
        nilai_hcv: "",
        nilai_tp: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("imltd.store"), {
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
            title="Tambah IMLTD"
            description="Tambahkan data imltd disini"
            open={open}
            setOpen={setOpen}
        >
            <TextInput
                title="No Kantong"
                name="blood_bag"
                onChange={(e) => setData("blood_bag", e.target.value)}
                error={errors.blood_bag}
                placeholder="Masukkan no kantong"
            />
            <TextInput
                title="HIV"
                name="nilai_hiv"
                placeholder="Nilai (titer AB)"
                onChange={(e) => setData("nilai_hiv", e.target.value)}
                error={errors.nilai_hiv}
            />

            <TextInput
                title="HbSAg"
                name="nilai_hbsag"
                placeholder="Nilai (titer AB)"
                onChange={(e) => setData("nilai_hbsag", e.target.value)}
                error={errors.nilai_hbsag}
            />

            <TextInput
                title="HCV"
                name="nilai_hcv"
                placeholder="Nilai (titer AB)"
                onChange={(e) => setData("nilai_hcv", e.target.value)}
                error={errors.nilai_hcv}
            />

            <TextInput
                title="TP"
                name="nilai_tp"
                placeholder="Nilai (titer AB)"
                onChange={(e) => setData("nilai_tp", e.target.value)}
                error={errors.nilai_tp}
            />
        </ModalAction>
    );
}

export function EditImltd({ item }: { item: ImltdType }) {
    const [open, setOpen] = useState(false);
    const { data, setData, patch, errors, processing, reset } = useForm({
        blood_bag: item.blood_bag,
        nilai_hiv: item.nilai_hiv,
        nilai_hbsag: item.nilai_hbsag,
        nilai_hcv: item.nilai_hcv,
        nilai_tp: item.nilai_tp,
    });

    // console.log(data);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("imltd.update", item.id), {
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
            title="Edit Imltd"
            isEdit
            description="Edit imltd disini."
            open={open}
            setOpen={setOpen}
        >
            <TextInput
                title="No Kantong"
                name="blood_bag"
                onChange={(e) => setData("blood_bag", e.target.value)}
                error={errors.blood_bag}
                placeholder="Masukkan no kantong"
                defaultValue={item.blood_bag}
            />
            <TextInput
                title="HIV"
                name="nilai_hiv"
                placeholder="Nilai (titer AB)"
                onChange={(e) => setData("nilai_hiv", e.target.value)}
                error={errors.nilai_hiv}
                defaultValue={item.nilai_hiv}
            />

            <TextInput
                title="HbSAg"
                name="nilai_hbsag"
                placeholder="Nilai (titer AB)"
                onChange={(e) => setData("nilai_hbsag", e.target.value)}
                error={errors.nilai_hbsag}
                defaultValue={item.nilai_hbsag}
            />

            <TextInput
                title="HCV"
                name="nilai_hcv"
                placeholder="Nilai (titer AB)"
                onChange={(e) => setData("nilai_hcv", e.target.value)}
                error={errors.nilai_hcv}
                defaultValue={item.nilai_hcv}
            />

            <TextInput
                title="TP"
                name="nilai_tp"
                placeholder="Nilai (titer AB)"
                onChange={(e) => setData("nilai_tp", e.target.value)}
                error={errors.nilai_tp}
                defaultValue={item.nilai_tp}
            />
        </ModalAction>
    );
}

export const DeleteImltd = ({ id }: { id: number }) => {
    const { delete: destroy, processing } = useForm();

    const deleteImltd: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("imltd.destroy", id), {
            preserveScroll: true,
            // onSuccess: () => closeModal(),
            onError: () => toasterForm({ success: false, message: "Error" }),
            // onFinish: () => reset(),
        });
    };

    return (
        <form >
            <PopupDelete onSubmit={deleteImltd}>
            <Button
                disabled={processing}
                variant={processing ? "outline" : "destructive"}
                size="sm"
            >
                {processing ? <LoadingDots /> : <Trash2Icon />}
            </Button>
            </PopupDelete>
        </form>
    );
};
