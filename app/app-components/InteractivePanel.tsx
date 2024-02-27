"use client";


import { use, useCallback, useEffect, useState } from "react";

import IconStepCheck from "@icons/IconStepCheck";
import IconLoading from "@icons/IconLoading";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import TextareaAutosize from 'react-textarea-autosize';


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
            <article className=" w-full   px-4 lg:px-64 2xl:px-[30%]">
                <div className="flex flex-col gap-2 py-7">
                    <Avatar>
                        <AvatarImage src={userData.user.user_metadata.picture} width={55} height={55} />
                    </Avatar>
                    <p className="font-syne text-md font-bold">Hi, {userData.user.user_metadata.full_name}!</p>
                </div>
                <p className="font-syne md:text-xl lg:text-3xl font-bold">Chart generator</p>
                <p className="text-[#8c8c8c]">what we were going to do is generate your visualization in some basic steps.</p>
            </article>
            <article className="  px-4 lg:px-64 2xl:px-[30%]">
                <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="w-full flex flex-col justify-start p-5 rounded-2xl border border-[#252525] hover:bg-black ">
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
            <div className="flex gap-3 px-4 lg:px-96 2xl:px-[20%]">
               

                <div className=" max-w-[40%] h-min-64 p-5 rounded-2xl border border-[#252525] ">
                    {isSuggestionsLoading ? <Skeleton className="min-w-[250px] h-36" /> : <div className="flex flex-col gap-2 pt-5">
                        <p>Suggestions based on AI (Mistral 7B):</p>
                        <div className="flex flex-wrap gap-4 overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {suggestions?.length > 0 && suggestions?.map((item, index) => (<SuggestionButton key={index} suggestionText={item.suggestion} chartType={item.chart_type} />))}
                        </div>
                    </div>}
                    <div className="flex gap-3 pt-4">
                        {!isSuggestionsLoading && <div tabIndex={0} className="flex justify-between min-h-11 items-center border border-[#8c8c8c] rounded-2xl  bg-black w-full px-2 hover:ring-3 ring-white">
                            <div className="w-[50px]">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={userData.user.user_metadata.picture} width={15} height={15} />
                                </Avatar>
                            </div>
                            <div className="w-full">
                                <TextareaAutosize
                                    rows={1}
                                    minLength={2}
                                    spellCheck={false}
                                    style={{
                                        colorScheme: 'dark',
                                    }} className="flex max-h-[95px] justify-center flex-[1_0_50%] min-w-[50%] disabled:opacity-80 text-white text-sm bg-transparent border-0 shadow-none resize-none outline-none ring-0 disabled:bg-transparent selection:bg-teal-300 selection:text-black placeholder:text-zinc-400 [scroll-padding-block:0.75rem] pr-2 leading-relaxed py-2.5 sm:py-3 w-full"
                                    maxLength={255}
                                    placeholder="Make a graph with the last data..."
                                />
                            </div>
                            <div>
                                {/* <div role="status">
                                    <IconLoading />
                                    <span className="sr-only">Loading...</span>
                                </div> */}
                            </div>
                        </div>}
                        {/* <div>
                            <Button className=" h-fulls">Pick your chart type</Button>
                        </div> */}
                    </div>


                </div>
                {isPanelReady && <div className="w-full h-min-64 p-5 rounded-2xl border border-[#252525]  ">
                    <p className=" font-syne md:text-xl font-bold">Create chart</p>
                    <p className="text-sm text-[#8c8c8c]">Please pick at least one of them.</p>

                    <div className="mt-6">
                        {/* <Skeleton className="min-w-[250px] h-64" /> */}
                        <ResponsiveContainer width={"100%"} minWidth={'100%'} aspect={2}>
                            <BarChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
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
                </div>}
            </div>


        </section>
    )
}