'use client';
import IconNotion from "@icons/IconNotion"
import { Button } from "@/components/ui/button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { VariantProps } from "class-variance-authority";
import { useRouter } from "next/navigation";

export default function SignInNotion({ variant = "outline" }: { variant: VariantProps<typeof Button>["variant"]}) {
    const router = useRouter()
    const signUp = async () => {
        const supabase = createClientComponentClient()
        const { data } = await supabase.auth.signInWithOAuth({
            provider: 'notion',
            options: {
                redirectTo: `${location.origin}/auth/callback`
            }
        })
        router.refresh();
    }

    return <Button variant={variant} onClick={signUp}>
        Connect to Notion <IconNotion className=" px-2" />
    </Button>
}
