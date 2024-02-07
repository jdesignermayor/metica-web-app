"use server";
import { Button } from "@/components/ui/button";
import IconLogo from "@icons/IconLogo";
import IconTwitter from "@icons/IconTwitter";
import IconNotion from "@icons/IconNotion";
import Link from "next/link";
import SignOutNotion from "./SignOutNotion";

export default async function Navbar({ userData = null }: any) {
    return <header className="flex justify-between px-4 2xl:px-[20%] py-5 items-center">
        <div>
            <IconLogo />
        </div>
        <ul className="flex gap-3">
            {!userData ? (<li>
                <Button variant='outline'>
                    Connect to Notion <IconNotion className=" px-2" />
                </Button>
            </li>) : (<li>
                <SignOutNotion />
            </li>)}
            <li>
                <Link href={'https://twitter.com/tafidi_di'} >
                    <Button variant='ghost'>
                        Keep stunned on <IconTwitter className=" px-2" />
                    </Button>
                </Link>
            </li>
        </ul>
    </header>
}