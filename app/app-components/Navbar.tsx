"use client";

import { Button } from "@/components/ui/button";
import IconLogo from "@icons/IconLogo";
import SignOutNotion from "./SignOutNotion";
import SignInNotion from "./SignInNotion";

export default function Navbar({ userData = null }: any) {
    return <header className="flex justify-between px-4 2xl:px-[20%] py-5 items-center">
        <div>
            <IconLogo />
        </div>
        <ul className="flex gap-3">
            {!userData?.provider_token ? (<li>
                <SignInNotion variant={'outline'} />
            </li>) : (<li>
                <SignOutNotion />
            </li>)}
        </ul>
    </header>
}