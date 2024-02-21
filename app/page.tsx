import Navbar from "@ui-components/Navbar";
import SignInNotion from "@ui-components/SignInNotion";
import InteractivePanel from "@ui-components/InteractivePanel";
import { Badge } from "@/components/ui/badge"

import { readUserSession } from "@actions/auth-actions";
import NewBadge from "@ui-components/NewBadge";
import { Button } from "@/components/ui/button";
import AnimationHome from "@ui-components/AnimationHome";

export default async function Home() {
  const { data } = await readUserSession();

  return (
    <>
      <Navbar userData={data.session} />
      <main>
        <article className="px-4 z-50 w-full h-[100vh] flex flex-col items-center">
          <div className="flex flex-col items-center text-center w-full lg:max-w-[50%] gap-6">
            <AnimationHome />
            <NewBadge bigMessage="Now we are available to create multiple Graphs using AI" shortMessage="Multiple Graphs available" />
            <h1 className=" font-bold text-4xl md:text-6xl lg:text-6xl">Bring your visuals  <br /><span> to the next level</span></h1>
            <p className=" text-gray-400 text-xl lg:max-w-[70%]">Power up your data viz with AI. Click 'Sign In' and see the future.</p>
            <div className="flex gap-4">
            {data.session?.provider_token ? <InteractivePanel /> : <SignInNotion variant={"default"} />}
            <Button variant={'outline'} className="max-w-48 rounded-full">
              Read more
            </Button>
            </div>
          </div>
        </article>
      </main>
    </>
  )
}
