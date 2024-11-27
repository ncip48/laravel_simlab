import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { InputError } from "./ui/input-error";
import { forwardRef, InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    title: string; // The label text
    name: string; // The input name and id
    error?: string; // Optional error message
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    ({ title, name, error, ...props }, ref) => {
        return (
            <div>
                <Label htmlFor="name">{title}</Label>

                <Input
                    id={name}
                    className="mt-1 block w-full"
                    autoComplete="off"
                    {...props}
                    ref={ref}
                />

                {error && <InputError className="mt-1" message={error} />}
            </div>
        );
    }
);

export default TextInput;
