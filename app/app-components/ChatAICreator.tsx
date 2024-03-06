import { Badge } from "@/components/ui/badge";
import SearchFieldByAI from "@ui-components/SearchFieldByAI";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppStore } from "@store/store";
import SuggestionButton from "./SuggestionButton";
import Typewriter from 'typewriter-effect';

const initialComment = {
    id: 1,
    message: "Welcome to Metica! Let's kick things off by leveraging your data. Below, you'll find a selection of suggested charts tailored to your dataset, each designed to maximize clarity and insight.",
    suggestions: null,
};

export default function ChatAICreator() {
    const [currentComments, setCurrentComments] = useState<any>([]);
    const [isSuggestionsReady, setIsSuggestionsReady] = useState(false);
    const { suggestions } = useAppStore();

    const getSuggestionList = useMemo(() => {
        if (suggestions.length > 0) {
            const currentSuggestions = suggestions.map((item, index) => <SuggestionButton key={index} {...item} />)
            setCurrentComments([{ ...initialComment, suggestions: currentSuggestions }]);
        }
    }, [suggestions])

    useEffect(() => {
        getSuggestionList
    }, [suggestions])

    return (
        <div>


            <span className="font-bold">Create your visuals with Metica <Badge className=" bg-purple-900 bg-opacity-30 text-purple-400 hover:text-black">BETA</Badge> </span>
            <div className=" bg-[#121212] rounded-2xl px-2 py-2 h-[620px] overflow-x-auto mt-4 " style={{ colorScheme: 'dark' }}>
                {
                    currentComments.map((comment: any) => {
                        return (
                            <div key={comment.id} >
                                <div className="typing-effect overflow-hidden whitespace-no-wrap mx-auto inline-block p-4">
                                    <p className="font-bold">Metica</p>
                                    <Typewriter
                                        onInit={(typewriter) => {
                                            typewriter.typeString(comment.message)
                                                .callFunction(() => {
                                                    setIsSuggestionsReady(true);
                                                    console.log('String typed out!');
                                                })
                                                .start();
                                        }}
                                        options={{
                                            delay: 15,
                                        }}
                                    />
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {isSuggestionsReady && <div className="flex flex-wrap gap-3  animate-fade">{comment.suggestions}</div>}
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
            <div className=" bottom-0">
                <SearchFieldByAI />
            </div>
        </div>
    )
}