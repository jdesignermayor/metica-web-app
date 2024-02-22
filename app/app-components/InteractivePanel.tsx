"use client";
import IconStepCheck from "@icons/IconStepCheck";
import IconPie from "@icons/IconPie";
import IconBar from "@icons/IconBar";
import IconLine from "@icons/IconLine";

import { Skeleton } from "@/components/ui/skeleton";
import { DatabaseToggle } from "./DatabaseToggle";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "../store/store";


export default function InteractivePanel({ userData }: { userData: any }) {
    const { databases, suggestions, getDatabases, flags: { isDatabasesLoading, isSuggestionsLoading } } = useAppStore();

    const setUpStore = useCallback(() => {
        getDatabases();
    }, []);

    useEffect(() => {
        setUpStore();
    }, []);

    return (
        <section className="flex flex-col gap-5 w-full  px-4  lg:px-64 2xl:px-[30%]">
            <article className=" w-full">
                <div className="flex flex-col gap-2 py-7">
                    <Avatar>
                        <AvatarImage src={userData.user.user_metadata.picture} width={55} height={55} />
                    </Avatar>
                    <p className="font-syne md:text-xl font-bold">Hi, {userData.user.user_metadata.full_name}!</p>
                </div>
                <p className="font-syne md:text-xl font-bold">Let's generate your chart</p>
                <p className="text-[#8c8c8c]">what we were going to do is generate your visualization in some basic steps.</p>
            </article>
            <ol className="relative border-s dark:border-[#252525] ml-4 pt-5">
                <li className="mb-10 ms-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ">
                        <IconStepCheck />
                    </span>
                    <div className="w-full h-64 p-5 rounded-2xl border border-[#252525]">
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
                        <div className="pt-6">
                            {isSuggestionsLoading ? <Skeleton className="min-w-[250px] h-36" /> : <div className="flex flex-wrap gap-4">
                                <p>Suggestions based on AI:</p>
                                {suggestions?.length > 0 && suggestions?.map((item, index) => {
                                    return <Button key={index} variant={'outline'} className="flex gap-2">
                                        {item.chart_type === 'pie' && <IconPie />}
                                        {item.chart_type === 'bar' && <IconBar />}
                                        {item.chart_type === 'line' && <IconLine />}
                                        {item.suggestion}</Button>
                                })}
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