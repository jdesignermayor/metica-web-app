'use client';
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useRouter } from "next/navigation";

export default function SignOutNotion() {
    const supabase = createClientComponentClient();
    const router = useRouter()

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
    }

    return <Button variant="outline" onClick={handleLogout}>
        Sign out from Notion
    </Button>
}