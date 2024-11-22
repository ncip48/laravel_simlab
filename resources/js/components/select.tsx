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
}: {
    title: string;
    items: { value: string; label: string }[];
    onChange: (id: string) => void;
    value: any;
}) {
    return (
        <Select onValueChange={onChange} defaultValue={value}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={title} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{title}</SelectLabel>
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
