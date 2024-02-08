import Navbar from "@ui-components/Navbar"
import { cookies } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import SignInNotion from "./app-components/SignInNotion";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: { user } } = await supabase.auth.getUser()
  const { data: { session } } = await supabase.auth.getSession()
  console.log('access_token', session?.provider_token);

  return (
    <>
      <Navbar userData={user} />
      <main>
        <article className="z-50 grid justify-center h-[100vh] ">
          <div className="flex flex-col gap-5 text-center object-center items-center">
            <div className="grid gap-4 pt-24 text-center w-full object-center">
              <h1 className=" font-bold text-2xl xl:text-5xl">Metica is the less-effort <br /><span className=" text-gray-400">Data Visualization Cloud Tool </span></h1>
              <p className=" text-gray-400 text-xl">Turn your data into life using the next gen of go-to tool, try your self clicking Sign in.</p>
              <div className="w-full">
                <SignInNotion variant={"default"} />
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  )
}
