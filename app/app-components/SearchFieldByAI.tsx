import { Avatar, AvatarImage } from "@/components/ui/avatar";
import TextareaAutosize from 'react-textarea-autosize';

export default function SearchFieldByAI() {
    return <div tabIndex={0}
        className="flex justify-between min-h-11 items-center border-2 border-[#ffffff] rounded-2xl bg-black w-full px-2 ">
        <div className="w-full">
            <TextareaAutosize rows={1} minLength={2} spellCheck={false} style={{ colorScheme: 'dark', }}
                className="flex max-h-[95px] justify-center flex-[1_0_50%] min-w-[50%] disabled:opacity-80 text-white text-sm bg-transparent border-0 shadow-none resize-none outline-none ring-0 disabled:bg-transparent selection:bg-teal-300 selection:text-black placeholder:text-zinc-400 [scroll-padding-block:0.75rem] pr-2 leading-relaxed py-2.5 sm:py-3 w-full"
                maxLength={255} placeholder="Make a graph with the last data..." />
        </div>
        <div>
            {/* <div role="status">
            <IconLoading />
            <span className="sr-only">Loading...</span>
        </div> */}
        </div>
    </div>
}

