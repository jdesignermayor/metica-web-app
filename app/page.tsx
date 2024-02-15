import Navbar from "@ui-components/Navbar";
import SignInNotion from "./app-components/SignInNotion";
import InteractivePanel from "./app-components/InteractivePanel";
import { readUserSession } from "@/lib/actions/auth-actions";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default async function Home() {
  const { data } = await readUserSession();
  const date = new Date().getHours()
  const stringDate = date < 12 ? 'Good Morning' : date < 18 ? 'Good Afternoon' : 'Good Night'

  return (
    <>
      <Navbar userData={data.session} />
      <main>
        <article className="px-4 z-50 grid justify-center h-[100vh] ">
          <div className="flex flex-col gap-5 text-center object-center items-center">
            <div className="grid gap-4 pt-24 text-center w-full object-center">
              <h1 className=" font-bold text-2xl xl:text-5xl">Metica is the less-effort <br /><span className=" bg-gradient-to-r from-gray-500 to-green-800 bg-clip-text text-transparent">Data Visualization Cloud Tool </span></h1>
              <p className=" text-gray-400 text-xl">Turn your data into life using the next gen of go-to tool, try your self clicking Sign in.</p>
              {data.session?.provider_token && <div className="flex items-center md:max-w-[250px] justify-center border-green-700 bg-gradient-to-r from-green-900 to-gray-700 border h-9 rounded-lg">
                <Label>✅ Connected to Notion</Label>
              </div>}
              {data.session?.provider_token ? <InteractivePanel /> : <SignInNotion variant={"default"} />}
            </div>
          </div>
        </article>
      </main>
    </>
  )
}
