import { ModalAction } from "@/components/modal-action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FormEventHandler, useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { InputError } from "@/components/ui/input-error";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import LoadingDots from "@/components/loading-dots";
import { CogIcon, Trash2Icon } from "lucide-react";
import { toasterForm } from "@/lib/utils";
import { AlatType } from "./columns";
import { PageProps } from "@/types";
import { PopupDelete } from "@/components/popup-delete";

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
            title="Edit Alat"
            isEdit
            description="Edit alat disini."
            open={open}
            setOpen={setOpen}
        >
            <div>
                <Label htmlFor="name">Nama Alat</Label>

                <Input
                    id="name"
                    className="mt-1 block w-full"
                    defaultValue={item.name || ""}
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
                    defaultValue={item.folder || ""}
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

    const deleteAlat: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("alat.destroy", id), {
            preserveScroll: true,
            // onSuccess: () => closeModal(),
            onError: () => toasterForm({ success: false, message: "Error" }),
            // onFinish: () => reset(),
        });
    };

    return (
        <form >
            <PopupDelete onSubmit={deleteAlat}>
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

type ParamType = {
    id: number;
    name: string;
    parameter: string; // Array of objects with id and name properties
};

export function ParameterAlat({ item }: { item: ParamType }) {
    const { appUrl } = usePage<PageProps>().props;

    const [open, setOpen] = useState(false);
    const [parameters, setParameters] = useState<ParamType[]>([]);
    const [selectedParameters, setSelectedParameters] = useState<any[]>([]);
    // console.log(item);
    const { data, setData, patch, errors, processing, reset } = useForm({
        name: item.name,
        send_param: [] as any[],
    });

    // Handle checkbox change
    const handleCheckboxChange = (parameterId: string) => {
        setSelectedParameters(
            (prevSelected) =>
                prevSelected.includes(parameterId)
                    ? prevSelected.filter((id) => id !== parameterId) // Unselect if already selected
                    : [...prevSelected, parameterId] // Add if not selected
        );
    };

    useEffect(() => {
        setData({ send_param: selectedParameters, name: item.name });
    }, [selectedParameters]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // console.log("Submitting with selected parameters:", selectedParameters);
        // console.log("Route:", route("alat.update", item.id));

        patch(route("alat.set.parameter", item.id), {
            preserveScroll: true,
            data: { selectedParameters },
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        toasterForm({ success: true, message: "Success" });
        reset();
        setOpen(false);
        setSelectedParameters([]);
        setParameters([]);
    };

    useEffect(() => {
        setSelectedParameters([]);
        setParameters([]);
    }, [open]);

    // Fetch parameters from the API when the component mounts or when 'item.id' changes
    useEffect(() => {
        const fetchParameters = async () => {
            try {
                const response = await fetch(`/alat/parameter/head/${item.id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch parameters");
                }

                const data = await response.json();
                setParameters(data); // Set the parameters state with the fetched data

                //TODO: set the setSelectedParameters by JSON.parse(item.parameters)
                // Parse the JSON string from item.parameters and update selected parameters
                if (item.parameter) {
                    const parsedParameters = JSON.parse(item.parameter);
                    setSelectedParameters(parsedParameters); // Set the selected parameters state
                } else {
                    // If there are no parameters to parse, set empty or default value
                    setSelectedParameters([]);
                }
            } catch (error) {
                console.error(error);
                // Handle the error as appropriate, e.g., set an error state
            }
        };

        if (item.id && open) {
            fetchParameters();
        }
    }, [open, item.id]); // This effect will run whenever the item.id changes

    return (
        <ModalAction
            submit={submit}
            processing={processing}
            title="Edit Parameter"
            // isEdit
            description="Sesuaikan parameter yang akan di tampilkan."
            open={open}
            setOpen={setOpen}
            icon={CogIcon}
        >
            <div>
                <Label htmlFor="name">Nama Alat</Label>

                <Input
                    id="name"
                    className="mt-1 block w-full"
                    readOnly
                    disabled
                    autoComplete="off"
                    value={item.name}
                />

                <InputError className="mt-1" message={errors.name} />
            </div>
            <div>
                <Label htmlFor="name">Parameter</Label>

                <div className="flex flex-wrap gap-4 mt-1">
                    {/* Use Flexbox and wrap */}
                    {parameters.map((parameter) => (
                        <div
                            key={parameter.id}
                            className="w-1/4 flex items-center"
                        >
                            {" "}
                            {/* Each item takes 20% width */}
                            <input
                                type="checkbox"
                                id={`parameter-${parameter.id}`}
                                checked={selectedParameters.includes(
                                    parameter.id.toString()
                                )}
                                onChange={() =>
                                    handleCheckboxChange(
                                        parameter.id.toString()
                                    )
                                }
                                className="form-checkbox"
                            />
                            <label
                                htmlFor={`parameter-${parameter.id}`}
                                className="ml-2 text-xs"
                            >
                                {parameter.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </ModalAction>
    );
}
