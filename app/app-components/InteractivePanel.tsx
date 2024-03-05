"use client";


import { use, useCallback, useEffect, useState } from "react";

import IconStepCheck from "@icons/IconStepCheck";
import IconLoading from "@icons/IconLoading";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";



import { DatabaseToggle } from "@ui-components/DatabaseToggle";
import SuggestionButton from "@ui-components/SuggestionButton";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { useAppStore } from "@store/store";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronsUpDown } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import SearchFieldByAI from "./SearchFieldByAI";

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export default function InteractivePanel({ userData }: { userData: any }) {
    const [isOpen, setIsOpen] = useState(true)
    const { databases, suggestions, getDatabases, flags: { isDatabasesLoading, isExtractingDatabaseByIdData, isPanelReady, isSuggestionsLoading } } = useAppStore();

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
                <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="w-full flex flex-col justify-start p-5 rounded-2xl 2xl:max-w-[40%]  border border-[#252525] hover:bg-black  hover:ring-2  ring-white">
                    <CollapsibleTrigger className="flex flex-row justify-between items-center">
                        <div className="flex flex-col justify-start items-start text-start">
                            <p className=" font-syne md:text-xl font-bold">Pick your Notion database</p>
                            <p className="text-sm text-[#8c8c8c]">Please pick at least one of them.</p>
                        </div>
                        <div>
                            {isExtractingDatabaseByIdData ? <div className="flex flex-row gap-3">
                                <IconLoading />
                                <p className="text-purple-400">Getting data...</p>
                            </div> : <div>
                                <ChevronsUpDown strokeWidth={2} />
                            </div>}
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className="pt-6">
                            {isDatabasesLoading ? <Skeleton className="min-w-[250px] h-36" /> : <DatabaseToggle databases={databases} />}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </article>

            {<div className="grid 2xl:flex gap-3 px-4 lg:px-72 2xl:px-[20%]">
                <div className="grid gap-2 2xl:max-w-[70%] h-min-64 p-5 rounded-2xl border border-[#252525] hover:ring-2  ring-white ">
                    <div className="flex flex-col gap-2 ">
                        <p>Suggestions based on AI (Mistral 7B):</p>
                        <div
                            className="flex flex-wrap gap-4 overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {suggestions?.length > 0 && suggestions?.map((item, index) => (
                                <SuggestionButton key={index} {...item} />))}
                        </div>
                    </div>
                    <div className="w-full bg-slate-400 p-3 rounded-lg">
                        <div>
                            <p>Conversation:</p>
                            <div className=" bg-[#141414] p-2">
                                <div>
                                    <p>Your last chat</p>
                                    <p>7/27/2024</p>
                                </div>
                            </div>
                        </div>
                        <p>Conversation:</p>
                        <div className=" bg-[#141414] p-2">
                            <div>
                                <p>Your last chat</p>
                                <p>7/27/2024</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <SearchFieldByAI />
                    </div>
                </div>
                <div className="w-full h-min-64 p-5 rounded-2xl border border-[#252525]  ">
                    <p className=" font-syne md:text-xl font-bold">Create chart</p>
                    <p className="text-sm text-[#8c8c8c]">Please pick at least one of them.</p>
                    <div className="mt-6">

                        <Skeleton className="min-w-[250px] h-64" />
                        <ResponsiveContainer width={"100%"} minWidth={'100%'} aspect={2}>
                            <BarChart width={500} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5, }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pv" fill="#fff" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                                <Bar dataKey="uv" fill="#252525" activeBar={<Rectangle fill="black" stroke="purple" />} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            }
        </section>
    )
}