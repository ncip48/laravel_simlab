import * as React from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function SelectOption({
    title,
    items,
    onChange,
    value,
    wFull = false,
}: {
    title?: string;
    items: { value: string; label: string }[];
    onChange: (id: string) => void;
    value: any;
    wFull?: boolean;
}) {
    return (
        <Select onValueChange={onChange} value={title ? value : items[0].value}>
            <SelectTrigger className={wFull ? "w-full" : "w-[180px]"}>
                <SelectValue placeholder={title} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {title && <SelectLabel>{title}</SelectLabel>}
                    {items.map((item, index) => {
                        return (
                            <SelectItem value={item.value} key={index}>
                                {item.label}
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
