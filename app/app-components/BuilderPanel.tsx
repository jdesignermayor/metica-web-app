import { Skeleton } from "@/components/ui/skeleton";

export default function BuilderPanel() {
    <div className="w-full h-min-64 p-5 rounded-2xl border border-[#252525]">
        <p className=" font-syne md:text-xl font-bold">Create chart</p>
        <p className="text-sm text-[#8c8c8c]">Please pick at least one of them.</p>
        <div className="mt-6">
            <Skeleton className="min-w-[250px] h-64" />
        </div>
        <div className="mt-6">
            <div className="flex gap-3">
                {!isSuggestionsLoading && <div tabIndex={0} className="flex justify-between min-h-11 items-center border border-[#8c8c8c] rounded-2xl  bg-[#1d1d1d] w-full px-2 hover:ring-3 ring-white">
                    <div className="w-[10%]">
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
                <div>
                    <Button className=" h-fulls">Pick your chart type</Button>
                </div>
            </div>

            {isSuggestionsLoading ? <Skeleton className="min-w-[250px] h-36" /> : <div className="flex flex-col gap-2 pt-5">
                <p>Suggestions based on AI (Mistral 7B):</p>
                <div className="flex flex-wrap gap-4">
                    {suggestions?.length > 0 && suggestions?.map((item, index) => (<SuggestionButton key={index} suggestionText={item.suggestion} chartType={item.chart_type} />))}
                </div>
            </div>}
        </div>
    </div>
}