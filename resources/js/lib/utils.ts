import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getNickName = (name: string | null | undefined) => {
    if (!name) return "HI"; // Default return if name is null, undefined or empty

    const nameParts = name.split(" "); // Split the name by spaces

    if (nameParts.length === 1) {
        // If there's only one word, return the first two characters in uppercase
        return nameParts[0].substring(0, 2).toUpperCase();
    }

    // If there are multiple words, return the first two characters of each word in uppercase
    return name
        .split(" ")
        .map((n) => n[0])
        .join("");
};

export const toasterForm = (res: { success: boolean; message: string }) => {
    if (res.success) {
        toast.success(res.message, {
            position: "bottom-center",
        });
    } else {
        toast.error(res.message, {
            position: "bottom-center",
        });
    }
};
