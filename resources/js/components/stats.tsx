import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DollarSign, LucideIcon } from "lucide-react";

export default function Stats({
    title,
    value,
    desc,
    icon: Icon,
}: {
    title: string;
    value: string;
    desc?: string;
    icon: LucideIcon;
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-normal">{title}</CardTitle>
                <Icon className="h-8 w-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {desc && (
                    <p className="text-xs text-muted-foreground">{desc}</p>
                )}
            </CardContent>
        </Card>
    );
}
