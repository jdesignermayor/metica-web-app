"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getDatabasesInfo } from "@actions/notion-actions";
import { useCallback, useEffect, useTransition } from "react";
import { DatabaseToggle } from "./DatabaseToggle";
import { useAuthStore } from "@store/store"


export default function InteractivePanel() {
    const [isPending, startTransition] = useTransition();
    const { databases, databaseData, setDatabasesStore, setIsLoading, isLoading } = useAuthStore((state: any) => state);

    const getDatabases = useCallback(() => {
        startTransition(async () => {
            await setIsLoading();
            const databasesData = await getDatabasesInfo();
            setDatabasesStore({ databases: databasesData });
        })
    }, [databases]);

    useEffect(() => {
        getDatabases();
    }, []);

    return (
        <div className="flex flex-col md:flex-row w-full justify-between gap-4">
            <div className="w-full md:min-w-[350px]">
                <Card className="flex flex-col justify-start items-start">
                    <CardHeader className="flex flex-col justify-start items-start">
                        <CardTitle>Your databases</CardTitle>
                        <CardDescription>Pick one of them in order to create a graph</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isPending ? <Skeleton className="min-w-[250px] h-10" /> : <div><DatabaseToggle databases={databases} /></div>}
                    </CardContent>
                </Card>
            </div>
            <div className="w-full">
                <Card className=" flex flex-col justify-start items-start w-full pt-4">
                    <CardContent>
                        {isLoading ? <Skeleton className="min-w-[250px] h-10" /> : <div className="flex w-full">data is ready....</div>}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}