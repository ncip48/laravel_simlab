"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "@inertiajs/react";

export function NavMain({
    items,
    title,
}: {
    items: {
        title: string;
        url: string;
        icon: LucideIcon;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
        }[];
    }[];
    title: string;
}) {
    const { pathname } = window.location;
    const isActive = (url: string) => {
        return pathname.split("/")[1] === url.replace("/", "");
    };

    return (
        <SidebarGroup>
            <SidebarGroupLabel>{title}</SidebarGroupLabel>
            <SidebarMenu>
                {items?.map((item, index) =>
                    item?.items && item.items.length > 0 ? (
                        <Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={isActive(item.url)}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        isActive={isActive(item.url)}
                                    >
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item?.items?.map((subItem) => (
                                            <SidebarMenuSubItem
                                                key={subItem.title}
                                            >
                                                <SidebarMenuSubButton asChild>
                                                    <Link href={subItem.url}>
                                                        <span
                                                            className={
                                                                pathname ===
                                                                subItem.url
                                                                    ? "font-bold"
                                                                    : ""
                                                            }
                                                        >
                                                            {subItem.title}
                                                        </span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ) : (
                        <Link href={item.url} key={index}>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    tooltip={item.title}
                                    isActive={item.url === pathname}
                                >
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>
                    )
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}
