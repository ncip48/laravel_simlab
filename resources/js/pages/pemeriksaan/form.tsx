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

const BLOOD_TYPE = [
    { value: "0", label: "Menunggu MCU" },
    { value: "1", label: "A" },
    { value: "2", label: "B" },
    { value: "3", label: "AB" },
    { value: "4", label: "O" },
];

const RHESUS = [
    { value: "0", label: "Menunggu MCU" },
    { value: "1", label: "??" },
    { value: "2", label: "!!" },
];

export function FormPemeriksaan({ patient }: { patient: PasienType }) {
    const formRef = useRef<HTMLFormElement>(null);

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
            onSuccess: () => onSuccess(),
            onFinish: () => reset(),
        });
    };

    const onSuccess = () => {
        formRef.current?.reset();
        toasterForm({ success: true, message: "Success" });
        reset();
    };

    return (
        <form ref={formRef} onSubmit={submit}>
            <div className="grid gap-4 py-4">
                <div>
                    <Label htmlFor="blood_bag">No Kantong</Label>

                    <Input
                        id="blood_bag"
                        className="mt-1 block w-full"
                        onChange={(e) => setData("blood_bag", e.target.value)}
                        autoComplete="off"
                    />

                    <InputError className="mt-1" message={errors.blood_bag} />
                </div>
                <div>
                    <Label htmlFor="blood_type">Golongan Darah</Label>
                    <SelectOption
                        title="Golongan Darah"
                        items={BLOOD_TYPE}
                        value=""
                        onChange={(e) => setData("blood_type", e)}
                        wFull
                    />
                    <InputError className="mt-1" message={errors.blood_type} />
                </div>
                <div>
                    <Label htmlFor="rhesus">Rhesus</Label>
                    <SelectOption
                        title="Golongan Darah"
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
                    Batal
                </Button>
                <FormButton processing={processing} />
            </div>
        </form>
    );
}
