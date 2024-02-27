"use client";

import { Button } from "@/components/ui/button";
import IconLogo from "@icons/IconLogo";
import SignOutNotion from "./SignOutNotion";
import SignInNotion from "./SignInNotion";
import { Badge } from "@/components/ui/badge";

export default function Navbar({ userData = null }: any) {
    return <header className="flex justify-between px-4 2xl:px-[20%] py-5 items-center">
        <div className="flex gap-2 items-center">
            <IconLogo />
            <Badge className=" bg-purple-900 bg-opacity-30 text-purple-400 hover:text-black">BETA</Badge>
        </div>
        <ul className="flex gap-3">
            {!userData?.provider_token ? (<li>
                <SignInNotion variant={'outline'} />
            </li>) : (<li>
                <SignOutNotion/>
            </li>)}
        </ul>
    </header>
}