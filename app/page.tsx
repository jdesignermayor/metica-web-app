"use client";
import { createClientComponentClient, createServerActionClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SignInNotion from "./app-components/SignInNotion";
import { useEffect } from "react";

export default function Home() {
  const getSessionData = async () => {
    const supabase = createClientComponentClient()

    const {
      data: { session }
    } = await supabase.auth.getSession()

    console.log('session', session)
  }

  useEffect(() => {
    getSessionData()

  }, [])

  return (
    <main className="p-8">
      <div className="flex justify-between gap-3 p-4">
        <Input placeholder="" name="userPrompt" />
        {/* <Button type="submit" >{isLoading ? 'Getting reponse...' : 'Submit'}</Button> */}
      </div>
      <p>Engine response(mistral):</p>
      <SignInNotion />
    </main>
  )
}
