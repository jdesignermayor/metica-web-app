import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NewBadge({ bigMessage, shortMessage, url = '#' }: { bigMessage: string, shortMessage: string, url?: string }) {
    return (
        <header className="flex items-center gap-4 w-full justify-center bg-gradient-to-r from-transparent via-[#101010] to-transparent rounded-full text-sm">
            <Badge className=" bg-purple-900 bg-opacity-30 text-purple-400 hover:text-black">New</Badge>
            <p className="flex items-center gap-4">
                <span className="hidden md:block">{bigMessage}</span>
                <span className="block md:hidden">{shortMessage}</span>
            </p>
            <Link href={url} passHref={true}>
                <Button variant={'link'}>
                    <span className="hidden lg:block">Read about it</span>
                </Button>
            </Link>
        </header>)
}