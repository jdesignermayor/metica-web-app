"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getDatabases } from "@actions/notion-actions";
import { useCallback, useEffect, useTransition } from "react";
import { DatabaseToggle } from "./DatabaseToggle";
import { useAppStore } from "@store/store"
import { Button } from "@/components/ui/button";


export default function InteractivePanel() {
    const [isPending, startTransition] = useTransition();
    const { userInfo, setIsLoading } = useAppStore();

    const getDatabases = useCallback(() => {
        startTransition(async () => {
            // await setIsLoading();
            const databasesData = await getDatabases();
            // setDatabasesStore({ databases: databasesData });
        })
    }, []);


    useEffect(() => {
        console.log("setIsLoading:", setIsLoading);
        setIsLoading
    }, []);

    // useEffect(() => {
    //     console.log('suggestionsData', typeof (suggestionsData))
    //     console.log('suggestionsData', (suggestionsData))
    // }, [suggestionsData]);

    return (
        <div className="flex flex-col md:flex-row w-full justify-between gap-4">
            <div className="w-full md:min-w-[350px]">
                <Card className="flex flex-col justify-start items-start">
                    <CardHeader className="flex flex-col justify-start items-start">
                        <CardTitle>Your databases</CardTitle>
                        <CardDescription>Pick one of them in order to create a graph</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* {isPending ? <Skeleton className="min-w-[250px] h-10" /> : <div><DatabaseToggle databases={databases} /></div>} */}
                    </CardContent>
                </Card>
            </div>
            <div className="w-full">
                <Card className=" flex flex-col justify-start items-start w-full pt-4">
                    <CardContent>
                        {/* {isLoading && suggestionsData && suggestionsData.length ? <Skeleton className="min-w-[250px] h-10" /> : <div>
                            <CardTitle>Here some suggestions:</CardTitle>
                            <div className="flex flex-wrap max-w-96 gap-3">
                                {suggestionsData && suggestionsData.length > 0 && suggestionsData?.map((item: any) => {
                                    return <Button variant={'outline'}>{item.suggestion}</Button>
                                })}
                            </div>
                        </div>} */}

                    </CardContent>
                </Card>
            </div>
        </div>
    )
}