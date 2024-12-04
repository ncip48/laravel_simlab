import { FormButton } from "@/components/modal-action";
import { SelectOption } from "@/components/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputError } from "@/components/ui/input-error";
import { Label } from "@/components/ui/label";
import { toasterForm } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";
import { PasienType } from "../pasien/columns";
import TextInput from "@/components/text-input";
import { BatteryFull, Trash2Icon, XCircleIcon } from "lucide-react";
import LoadingDots from "@/components/loading-dots";
import { PopupDelete } from "@/components/popup-delete";

export const BLOOD_TYPE = [
    { value: "0", label: "Menunggu MCU" },
    { value: "1", label: "A" },
    { value: "2", label: "B" },
    { value: "3", label: "AB" },
    { value: "4", label: "O" },
];

export const RHESUS = [
    { value: "0", label: "Menunggu MCU" },
    { value: "1", label: "??" },
    { value: "2", label: "!!" },
];

export function FormPemeriksaan({ patient }: { patient: PasienType }) {
    const formRef = useRef<HTMLFormElement>(null);
    const bloodBagRef = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        post,
        errors,
        processing,
        recentlySuccessful,
        reset,
    } = useForm({
        patient_id: patient.id || 0,
        name: "",
        blood_type: "",
        rhesus: "",
        blood_bag: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("pemeriksaan.store"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => onSuccess(),
            onError: () => onFocusBloodBag(),
        });
    };

    const onFocusBloodBag = () => {
        if (bloodBagRef.current) {
            bloodBagRef.current.focus();
        }
    };

    const onSuccess = () => {
        formRef.current?.reset();
        if (bloodBagRef.current) {
            bloodBagRef.current.focus();
        }
        toasterForm({ success: true, message: "Success" });
        reset();
    };

    return (
        <form ref={formRef} onSubmit={submit}>
            <div className="grid gap-4 py-4">
                <TextInput
                    title="No Kantong"
                    name="blood_bag"
                    onChange={(e) => setData("blood_bag", e.target.value)}
                    autoFocus
                    ref={bloodBagRef}
                    onBlur={(e: any) => {
                        if (e.relatedTarget === null) {
                            e.target.focus();
                        }
                    }}
                    error={errors.blood_bag}
                />
                <div>
                    <Label htmlFor="blood_type">Golongan Darah</Label>
                    <SelectOption
                        title="Golongan Darah"
                        items={BLOOD_TYPE}
                        value=""
                        onChange={(e) => {
                            setData("blood_type", e);
                        }}
                        wFull
                    />
                    <InputError className="mt-1" message={errors.blood_type} />
                </div>
                <div>
                    <Label htmlFor="rhesus">Rhesus</Label>
                    <SelectOption
                        title=" Rhesus"
                        items={RHESUS}
                        value=""
                        onChange={(e) => setData("rhesus", e)}
                        wFull
                    />
                    <InputError className="mt-1" message={errors.rhesus} />
                </div>
            </div>
            <div className="flex gap-2">
                <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => window.history.back()}
                >
                    <XCircleIcon />
                    Batal
                </Button>
                <FormButton processing={processing} />
            </div>
        </form>
    );
}
export const DeletePemeriksaan = ({ id }: { id: number }) => {
    const { delete: destroy, processing } = useForm();

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("pemeriksaan.destroy", id), {
            preserveScroll: true,
            // onSuccess: () => closeModal(),
            onError: () => toasterForm({ success: false, message: "Error" }),
            // onFinish: () => reset(),
        });
    };

    return (
        <form>
            <PopupDelete onSubmit={deleteUser}>
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
