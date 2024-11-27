import {
    Dispatch,
    FormEventHandler,
    SetStateAction,
    useRef,
    useState,
} from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LucideIcon, PencilIcon, PlusCircleIcon } from "lucide-react";
import LoadingDots from "@/components/loading-dots";

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
    icon: Icon,
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
    icon?: LucideIcon;
}) => {
    const formRef = useRef<HTMLFormElement>(null);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant={Icon ? "secondary" : "default"}>
                    {Icon && <Icon />}
                    {!Icon ? (
                        !isEdit ? (
                            <PlusCircleIcon />
                        ) : (
                            <PencilIcon />
                        )
                    ) : (
                        <></>
                    )}
                    {!isEdit && !Icon ? "Tambah" : ""}
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
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                            >
                                Tutup
                            </Button>
                        </DialogClose>
                        <FormButton processing={processing} />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export const FormButton = ({ processing }: { processing: boolean }) => {
    return (
        <Button type="submit" disabled={processing} size="sm">
            {processing ? <LoadingDots /> : <p>Simpan</p>}
        </Button>
    );
};
