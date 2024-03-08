import { Badge } from "@/components/ui/badge";
import SearchFieldByAI from "@ui-components/SearchFieldByAI";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppStore } from "@store/store";
import SuggestionButton from "./SuggestionButton";
import Typewriter from 'typewriter-effect';
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import IconLoading from "@/public/icons/IconLoading";

type CommentType = {
    id: number;
    message: string;
    suggestions?: any;
    chartComponent?: any;
    isSuggest?: boolean;
    isChartReady?: boolean;
}

export default function ChatAICreator() {
    const [isSuggestionsReady, setIsSuggestionsReady] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const { suggestions, comments, flags: { isRefreshingSuggestions }, getSuggestions } = useAppStore();

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
            <div className=" bg-[#121212] min-w-[450px] rounded-2xl px-2 py-2 h-[620px] overflow-x-auto my-4 divide-y divide-[#252525]" style={{ colorScheme: 'dark' }}>
                {
                    comments && comments.length > 0 && comments.map(({ id, message, isSuggest }) => {
                        return (
                            <div key={id}>
                                <div className="typing-effect overflow-hidden whitespace-no-wrap mx-auto inline-block p-4">
                                    <p className="font-bold">Metica</p>
                                    <Typewriter
                                        onInit={(typewriter) => {
                                            typewriter.typeString(message)
                                                .callFunction(() => {
                                                    setIsSuggestionsReady(true);
                                                    console.log('String typed out!');
                                                })
                                                .start();
                                        }}
                                        options={{
                                            loop: false,
                                            delay: 2,
                                        }}
                                    />
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {isSuggestionsReady && <div className="flex flex-wrap gap-3  animate-fade">{suggestions.map((item, index) => <SuggestionButton key={index} {...item} />)}
                                            <Button variant={'outline'} className="flex gap-2 items-center" onClick={onHandleRefreshSuggestions}>
                                                {isRefreshingSuggestions ? <span className="flex gap-2 items-center"><IconLoading />Refreshing...</span> : <span className="flex gap-2 items-center"><RefreshCcw />Refresh suggestions</span>}
                                            </Button>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <div ref={ref} />
            </div>
            <div className="">
                <SearchFieldByAI />
            </div>
        </div>
    )
}