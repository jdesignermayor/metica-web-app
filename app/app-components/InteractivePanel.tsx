"use client";
import { useCallback, useEffect } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@store/store";

import DatabasePicker from "@ui-components/DatabasePicker";
import ChatAICreator from "@ui-components/ChatAICreator";
import ChartAIPanel from "@ui-components/ChartAIPanel";

export default function InteractivePanel({ userData }: { userData: any }) {
    const { getDatabases, flags: { isPanelReady } } = useAppStore();

    const setUpStore = useCallback(() => {
        getDatabases();
    }, [getDatabases]);

    useEffect(() => {
        setUpStore();
    }, [setUpStore]);

    return (
        <section className="flex flex-col gap-5 w-full">
            <article className=" w-full px-4 lg:px-72 2xl:px-[20%]">
                <div className="flex flex-col gap-2 py-7">
                    <Avatar>
                        <AvatarImage src={userData.user.user_metadata.picture} width={55} height={55} />
                    </Avatar>
                    <p className="font-syne text-md font-bold">Hi, {userData.user.user_metadata.full_name}!</p>
                </div>
                <p className="font-syne md:text-xl lg:text-3xl font-bold">Chart generator</p>
                <p className="text-[#8c8c8c]">what we were going to do is generate your visualization in some basic steps.</p>
            </article>
            <article className=" px-4 lg:px-72 2xl:px-[20%]">
                <DatabasePicker />
            </article>
            {isPanelReady && <article className="flex gap-5 lg:mx-72 2xl:mx-[20%] lg:h-[780px]">
                <div className="max-w-9/12 w-9/12 p-5 rounded-2xl border border-[#252525]">
                    <ChatAICreator />
                </div>
                {/* <div className=" w-full p-5 rounded-2xl border border-[#252525]">
                    <ChartAIPanel />
                </div> */}
            </article>}
        </section>
    )
}