'use client';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import supabase from "@/lib/supabase/client";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { LogOut } from "lucide-react";

import { useRouter } from "next/navigation";

type UserMetadata = {
    avatar_url: string;
    email: string;
    name: string;
    picture: string;
}

export default function SignOutNotion() {
    const router = useRouter();
    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
    }

    return <nav className="flex items-center gap-5">
        <Button variant="outline" className="flex gap-3" onClick={handleLogout}>
            <LogOut strokeWidth={2} />
            Sign out from Notion
        </Button>
    </nav>
}