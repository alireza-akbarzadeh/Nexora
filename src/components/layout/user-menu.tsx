"use client";

import {useRouter} from "next/navigation";
import {BadgeCheck, LayoutDashboard, LogOut, Settings, ShieldCheck, User, Wallet,} from "lucide-react";

import {authClient} from "@/lib/auth/client";
import {formatMemberSince, getUserInitials} from "@/lib/user-display";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Skeleton} from "@/components/ui/skeleton";
import {cn} from "@/lib/utils";

type UserMenuProps = {
    className?: string;
};

export function UserMenu({className}: UserMenuProps) {
    const router = useRouter();
    const {data: session, isPending} = authClient.useSession();
    const user = session?.user;

    async function handleSignOut() {
        await authClient.signOut();
        router.push("/login");
        router.refresh();
    }

    if (isPending) {
        return (
            <div className={cn("flex items-center gap-2", className)}>
                <Skeleton className="size-8 rounded-full"/>
            </div>
        );
    }

    const initials = getUserInitials(user?.name, user?.email);
    const memberSince = formatMemberSince(user?.createdAt);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "size-10 border-border/60 bg-background/60 shadow-sm",
                            "transition-all hover:bg-accent hover:border-border",
                            "focus-visible:ring-1 focus-visible:ring-primary/30", className
                        )}
                    >
                        <UserAvatar
                            name={user?.name}
                            email={user?.email}
                            image={user?.image}
                            initials={initials}
                            size="sm"
                        />
                    </Button>
                }
            />

            <DropdownMenuContent
                align="end"
                className="w-72 p-0"
                side={"bottom"}
            >
                <div className="border-b border-border bg-muted/20 p-4">
                    <div className="flex items-start gap-3">
                        <UserAvatar
                            name={user?.name}
                            email={user?.email}
                            image={user?.image}
                            initials={initials}
                            size="lg"
                        />
                        <div className="min-w-0 flex-1 space-y-1">
                            <p className="truncate font-medium">{user?.name ?? "Nexora User"}</p>
                            <p className="truncate text-xs text-muted-foreground">
                                {user?.email ?? "No email on file"}
                            </p>
                            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                                {user?.emailVerified ? (
                                    <Badge variant="secondary" className="h-5 gap-1 px-1.5 text-[10px]">
                                        <BadgeCheck className="size-3"/>
                                        Verified
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="h-5 px-1.5 text-[10px]">
                                        Unverified
                                    </Badge>
                                )}
                                {memberSince ? (
                                    <span className="text-[10px] text-muted-foreground">
                    Member since {memberSince}
                  </span>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>

                <DropdownMenuGroup className="p-1">
                    <DropdownMenuLabel className="text-[10px] uppercase tracking-wider">
                        Account
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                        <LayoutDashboard className="size-4"/>
                        Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/portfolio")}>
                        <Wallet className="size-4"/>
                        Portfolio
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/settings")}>
                        <Settings className="size-4"/>
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator/>

                <DropdownMenuGroup className="p-1">
                    <DropdownMenuLabel className="text-[10px] uppercase tracking-wider">
                        Security
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => router.push("/settings#security")}>
                        <ShieldCheck className="size-4"/>
                        Two-factor auth
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/settings")}>
                        <User className="size-4"/>
                        Edit profile
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator/>

                <DropdownMenuGroup className="p-1">
                    <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
                        <LogOut className="size-4"/>
                        Sign out
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function UserAvatar({
                        name,
                        email,
                        image,
                        initials,
                        size = "md",
                    }: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    initials: string;
    size?: "sm" | "md" | "lg";
}) {
    const sizeClass =
        size === "lg" ? "size-10" : size === "sm" ? "size-7" : "size-8";

    return (
        <Avatar className={cn(sizeClass, "ring-1 ring-border")}>
            {image ? (
                <AvatarImage src={image} alt={name ?? email ?? "User avatar"}/>
            ) : null}
            <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
                {initials}
            </AvatarFallback>
        </Avatar>
    );
}
