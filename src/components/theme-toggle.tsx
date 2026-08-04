"use client";

import {Monitor, Moon, Sun} from "lucide-react";

import {useTheme} from "@/hooks/use-theme";

import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {cn} from "@/lib/utils";

const OPTIONS = [
    {value: "light", label: "Light", icon: Sun},
    {value: "dark", label: "Dark", icon: Moon},
    {value: "system", label: "System", icon: Monitor},
] as const;

export function ThemeToggle() {
    // useTheme reads through useSyncExternalStore, which renders the default
    // during hydration and corrects afterwards — no mounted guard needed.
    const {theme, setTheme} = useTheme();

    const active = OPTIONS.find((o) => o.value === theme) ?? OPTIONS[2];
    const ActiveIcon = active.icon;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button
                    variant="outline"
                    size="icon"
                    aria-label="Select theme"
                    className={cn(
                        "size-9 border-border/60 bg-background/60 shadow-sm",
                        "transition-all hover:bg-accent hover:border-border",
                        "focus-visible:ring-1 focus-visible:ring-primary/30",
                    )}
                >
                    <ActiveIcon className="size-4"/>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="min-w-36">
                {OPTIONS.map(({value, label, icon: Icon}) => (
                    <DropdownMenuItem
                        key={value}
                        onClick={() => setTheme(value)}
                        className={cn(
                            "flex items-center gap-2",
                            theme === value && "bg-accent text-accent-foreground",
                        )}
                    >
                        <Icon className="size-4"/>
                        <span>{label}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
