"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
    label,
    onChange,
    value,
}: {
    label: string;
    onChange: (date: Date | undefined) => void;
    value: any;
}) {
    const [date, setDate] = React.useState<Date>();
    const valDate = new Date(value);
    // console.log("v", valDate);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !valDate && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {valDate ? format(valDate, "PPP") : <span>{label}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={valDate}
                    onSelect={(e) => {
                        setDate(e);
                        onChange(e);
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
