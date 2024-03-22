import { Badge } from "@/components/ui/badge";
import SearchFieldByAI from "@ui-components/SearchFieldByAI";
import { useEffect, useRef } from "react";
import { useAppStore } from "@store/store";
import SuggestionButton from "./SuggestionButton";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import IconLoading from "@/public/icons/IconLoading";


export default function ChatAICreator() {
    const ref = useRef<HTMLDivElement>(null);
    const { comments, flags: { isRefreshingSuggestions, isGeneratingAIresponse }, getSuggestions } = useAppStore();

    const onHandleRefreshSuggestions = () => {
        getSuggestions({ isInitial: false });
    }

    useEffect(() => {
        if (comments && comments.length) {
            ref.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    }, [comments]);

    return (
        <div>
            <span className="font-bold">Create your visuals with Metica <Badge className=" bg-purple-900 bg-opacity-30 text-purple-400 hover:text-black">BETA</Badge></span>
            <div className=" min-w-[450px] flex flex-col gap-4 rounded-2xl px-2 py-2 h-[620px] overflow-x-auto my-4 divide-y divide-[#252525]" style={{ colorScheme: 'dark' }}>
                {
                    comments && comments.length > 0 && comments.map(({ id, message, isSuggest, suggestions, type }) => {
                        return (
                            <div key={id} className={` ${type === 'question' ? ' bg-[#a184fc6b]' : 'bg-[#212121]'} rounded-lg`}>
                                <div className="typing-effect overflow-hidden whitespace-no-wrap mx-auto inline-block p-4">
                                    <p>{message}</p>
                                </div>
                                {isSuggest && suggestions && suggestions.length > 0 && <div className="flex flex-wrap gap-3 p-4">
                                    <div className="flex flex-wrap gap-3  animate-fade">{suggestions.map((item, index) => <SuggestionButton key={index} {...item} />)}
                                        <Button variant={'outline'} className="flex gap-2 items-center" onClick={onHandleRefreshSuggestions}>
                                            {isRefreshingSuggestions ? <span className="flex gap-2 items-center"><IconLoading />Refreshing...</span> : <span className="flex gap-2 items-center"><RefreshCcw />Refresh suggestions</span>}
                                        </Button>
                                    </div>
                                </div>}
                            </div>
                        )
                    })
                }
                {isGeneratingAIresponse && <div className=" bg-[#212121] p-4 w-1/6 flex items-center justify-center flex-col max-w-[320px] leading-1.5  border-gray-200 rounded-t-xl rounded-es-xl ">
                    <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24"><circle cx={4} cy={12} r={3} fill="currentColor"><animate id="svgSpinners3DotsBounce0" attributeName="cy" begin="0;svgSpinners3DotsBounce1.end+0.25s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"></animate></circle><circle cx={12} cy={12} r={3} fill="currentColor"><animate attributeName="cy" begin="svgSpinners3DotsBounce0.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"></animate></circle><circle cx={20} cy={12} r={3} fill="currentColor"><animate id="svgSpinners3DotsBounce1" attributeName="cy" begin="svgSpinners3DotsBounce0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12"></animate></circle></svg>
                </div>}
                <div ref={ref} />
            </div>
            <div className="">
                <SearchFieldByAI />
            </div>
        </div>
    )
}