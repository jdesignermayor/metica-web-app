"use client";

import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import ChartResult from "./app-components/ChartResult";
import { Input } from "@/components/ui/input";

import { useState } from "react";

export default function Home() {
  const [metrics, setMetrics] = useState([]) 

  return (
    <main className=" p-8">
      <div className="flex justify-between gap-3 p-4">
        <Input placeholder="" name="userPrompt" />
        {/* <Button type="submit" >{isLoading ? 'Getting reponse...' : 'Submit'}</Button> */}
      </div>
      <p>Engine response(mistral):</p>
      <ChartResult data={metrics} />
    </main>
  )
}
