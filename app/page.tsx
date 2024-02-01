"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {

  return (
    <main className="p-8">
      <div className="flex justify-between gap-3 p-4">
        <Input placeholder="" name="userPrompt" />
        {/* <Button type="submit" >{isLoading ? 'Getting reponse...' : 'Submit'}</Button> */}
      </div>
      <p>Engine response(mistral):</p>
    </main>
  )
}
