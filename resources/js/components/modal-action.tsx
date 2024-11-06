import {
    Dispatch,
    FormEventHandler,
    SetStateAction,
    useRef,
    useState,
} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusCircleIcon } from "lucide-react";
import LoadingDots from "@/components/loading-dots";
import { toasterForm } from "@/lib/utils";

export const ModalAction = ({
    submit,
    children,
    isEdit = false,
    title,
    description,
    processing = false,
    setOpen,
    open,
    formData = false,
}: {
    id?: string | null;
    submit: FormEventHandler;
    children: React.ReactNode;
    isEdit?: boolean;
    title: string;
    description: string;
    processing?: boolean;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    formData?: boolean;
}) => {
    const formRef = useRef<HTMLFormElement>(null);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    {!isEdit ? <PlusCircleIcon /> : <PencilIcon />}
                    {!isEdit ? "Tambah" : ""}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form
                    ref={formRef}
                    onSubmit={submit}
                    encType={
                        formData
                            ? "multipart/form-data"
                            : "application/x-www-form-urlencoded"
                    }
                >
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">{children}</div>
                    <DialogFooter>
                        <FormButton processing={processing} />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const FormButton = ({ processing }: { processing: boolean }) => {
    return (
        <Button type="submit" disabled={processing} size="sm">
            {processing ? <LoadingDots /> : <p>Simpan</p>}
        </Button>
    );
};
