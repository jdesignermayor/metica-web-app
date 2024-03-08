import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Skeleton } from "@/components/ui/skeleton";
import IconLoading from "@/public/icons/IconLoading";
import { ChevronsUpDown } from "lucide-react";
import { DatabaseToggle } from "./DatabaseToggle";
import { useAppStore } from "@store/store";
import { useEffect, useState } from "react";

export default function DatabasePicker() {
    const { databases, currentDatabase, flags: { isDatabasesLoading, isExtractingDatabaseByIdData } } = useAppStore();
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (!isExtractingDatabaseByIdData && isOpen) setIsOpen(false)
        return () => {
            setIsOpen(true)
        }
    }, [isExtractingDatabaseByIdData])

    return <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full flex flex-col justify-start p-5 rounded-2xl 2xl:max-w-[50em] border border-[#252525] hover:bg-black hover:ring-2  ring-white">
        <CollapsibleTrigger className="flex flex-row justify-between items-center">
            <div className="flex flex-col justify-start items-start text-start">
                <p className=" font-syne md:text-xl font-bold">Pick your Notion database</p>
                {currentDatabase?.title ? <p className="text-base italic pt-3">Your current selection: <a href="#" className=" text-purple-400">{currentDatabase.title}</a></p> : <p className="text-sm text-[#8c8c8c]">Please pick at least one of them.</p>}
            </div>
            <div>
                {isExtractingDatabaseByIdData ? <div className="flex flex-row items-center gap-3">
                    <IconLoading />
                    <p>Getting data...</p>
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
} 