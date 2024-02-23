"use client";


import { useCallback, useEffect } from "react";

import IconStepCheck from "@icons/IconStepCheck";

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


export default function InteractivePanel({ userData }: { userData: any }) {
    const { databases, suggestions, getDatabases, flags: { isDatabasesLoading, isSuggestionsLoading } } = useAppStore();

    const setUpStore = useCallback(() => {
        getDatabases();
    }, [getDatabases]);

    useEffect(() => {
        setUpStore();
    }, [setUpStore]);

    return (
        <section className="flex flex-col gap-5 w-full  px-4  lg:px-64 2xl:px-[30%]">
            <article className=" w-full">
                <div className="flex flex-col gap-2 py-7">
                    <Avatar>
                        <AvatarImage src={userData.user.user_metadata.picture} width={55} height={55} />
                    </Avatar>
                    <p className="font-syne md:text-xl font-bold">Hi, {userData.user.user_metadata.full_name}!</p>
                </div>
                <p className="font-syne md:text-xl font-bold">Lets generate your chart</p>
                <p className="text-[#8c8c8c]">what we were going to do is generate your visualization in some basic steps.</p>
            </article>
            <Collapsible>
                <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
                <CollapsibleContent>
                    Yes. Free to use for personal and commercial projects. No attribution
                    required.
                </CollapsibleContent>
            </Collapsible>
            <ol className="relative border-s dark:border-[#252525] ml-4 pt-5">
                <li className="mb-10 ms-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ">
                        <IconStepCheck />
                    </span>
                    <div className="w-full min-h-64 p-5 rounded-2xl border border-[#252525]">
                        <p className=" font-syne md:text-xl font-bold">Pick your Notion database</p>
                        <p className="text-sm text-[#8c8c8c]">Please pick at least one of them.</p>
                        <div className=" pt-6">
                            {isDatabasesLoading ? <Skeleton className="min-w-[250px] h-36" /> : <DatabaseToggle databases={databases} />}
                        </div>
                    </div>
                </li>
                <li className="mb-10 ms-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ">
                        <IconStepCheck />
                    </span>
                    <div className="w-full h-min-64 p-5 rounded-2xl border border-[#252525]">
                        <p className=" font-syne md:text-xl font-bold">Create chart</p>
                        <p className="text-sm text-[#8c8c8c]">Please pick at least one of them.</p>
                        <div className="mt-6">
                            <Skeleton className="min-w-[250px] h-64" />
                        </div>
                        <div className="mt-6">
                            <div className="flex gap-3">
                                {!isSuggestionsLoading && <div tabIndex={0} className="flex justify-between min-h-11 items-center border border-[#8c8c8c] rounded-2xl  bg-[#1d1d1d] w-full px-2 hover:ring-3 ring-white">
                                    <div className="">
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage src={userData.user.user_metadata.picture} width={15} height={15} />
                                        </Avatar>
                                    </div>
                                    <div className="w-[80%]">
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
                                        <div role="status">
                                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-[#8c8c8c] fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                </div>}
                                <div>
                                    <Button className=" h-fulls">Pick your chart type</Button>
                                </div>
                            </div>

                            {isSuggestionsLoading ? <Skeleton className="min-w-[250px] h-36" /> : <div className="flex flex-col gap-2 pt-5">
                                <p>Suggestions based on AI:</p>
                                <div className="flex flex-wrap gap-4">
                                    {suggestions?.length > 0 && suggestions?.map((item, index) => (<SuggestionButton key={index} suggestionText={item.suggestion} chartType={item.chart_type} />))}
                                </div>
                            </div>}
                        </div>
                    </div>
                </li>


                {/* <li className="mb-10 ms-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                        </svg>
                    </span>
                    <h3 className="font-medium leading-tight">Account Info</h3>
                    <p className="text-sm">Step details here</p>
                </li>
                <li className="mb-10 ms-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                        </svg>
                    </span>
                    <h3 className="font-medium leading-tight">Review</h3>
                    <p className="text-sm">Step details here</p>
                </li>
                <li className="ms-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                        <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                        </svg>
                    </span>
                    <h3 className="font-medium leading-tight">Confirmation</h3>
                    <p className="text-sm">Step details here</p>
                </li> */}
            </ol>
        </section>
    )
}