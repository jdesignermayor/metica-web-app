'use client';
import IconNotion from "@icons/IconNotion"
import { Button } from "@/components/ui/button"
import { createBrowserClient } from "@supabase/ssr"
import { VariantProps } from "class-variance-authority";
import supabase from "@/lib/supabase/client";

export default function SignInNotion({ variant = "outline" }: { variant: VariantProps<typeof Button>["variant"] }) {
    const signUp = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'notion',
            options: {
                redirectTo: `${location.origin}/auth/callback/`
            }
        })
    }
    return <Button variant={variant} onClick={signUp} className="max-w-48 rounded-full">
        Connect to Notion <IconNotion className="px-2" />
    </Button>
}
