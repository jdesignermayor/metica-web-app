import Navbar from "@ui-components/Navbar";
import SignInNotion from "@ui-components/SignInNotion";
import InteractivePanel from "@ui-components/InteractivePanel";
import NewBadge from "@ui-components/NewBadge";
import AnimationHome from "@ui-components/AnimationHome";

import { Button } from "@/components/ui/button";
import { readUserSession } from "@actions/auth-actions";

export default async function Home() {
  const { data } = await readUserSession();
  console.log('user data:', data)

  return (
    <>
      <Navbar userData={data.session} />
      <main>
        {data.session?.provider_token ? <InteractivePanel userData={data.session} /> : <article className="px-4 z-50 w-full h-[100vh] flex flex-col items-center">
          <div className="flex flex-col items-center text-center w-full lg:max-w-[50%] gap-6">
            <AnimationHome />
            <NewBadge bigMessage="Now we are available to create multiple Graphs using AI" shortMessage="Multiple Graphs available" />
            <h1 className=" font-bold text-4xl md:text-6xl lg:text-6xl font-syne">Bring your visuals  <br /><span> to the next level</span></h1>
            <p className=" text-gray-400 text-xl max-w-80 lg:max-w-[70%] font-normal">Power up your data viz with AI. Click 'Sign In' and see the future.</p>
            <div className="flex gap-4">
              {!data.session?.provider_token && <><SignInNotion variant={"default"} />
                <Button variant={'outline'} className="max-w-48 rounded-full">
                  Read more
                </Button></>}
            </div>
          </div>
        </article>}
      </main>
    </>
  )
}
