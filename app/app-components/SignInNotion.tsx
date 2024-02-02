import { Button } from "@/components/ui/button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function SignInNotion() {

    const signUp = async () => {
        const supabase = createClientComponentClient()
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'notion',
            options: {
                redirectTo: 'http://localhost:3000?',
            }
        })
    }

    return <Button onClick={signUp}>Sign Up</Button>
}
