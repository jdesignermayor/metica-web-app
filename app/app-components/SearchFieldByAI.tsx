import { CornerDownLeft } from "lucide-react";
import TextareaAutosize from 'react-textarea-autosize';
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
    prompt: string
}

export default function SearchFieldByAI() {
    const {
        register,
        handleSubmit,
        formState
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
    }

    return <div tabIndex={0}
    >
        <article>
            <div className="flex justify-between min-h-16 items-center border border-[#252525] rounded-lg bg-black w-full px-2 bottom-0">
                <form onSubmit={handleSubmit(onSubmit)} className="flex items-center w-full">
                    <TextareaAutosize rows={1} minLength={2} {...register("prompt", { required: true })} spellCheck={false} style={{ colorScheme: 'dark', }}
                        className="flex max-h-[95px] justify-center flex-[1_0_50%] min-w-[50%] disabled:opacity-80 text-white text-sm bg-transparent border-0 shadow-none resize-none outline-none ring-0 disabled:bg-transparent selection:bg-teal-300 selection:text-black placeholder:text-zinc-400 [scroll-padding-block:0.75rem] pr-2 leading-relaxed py-2.5 sm:py-3 w-full"
                        maxLength={255} placeholder="Make a graph with the last data..." />
                    <button className="bg-white text-black p-2 rounded-lg disabled:opacity-45 hover:opacity-65" type="submit" disabled={!formState.isValid} ><CornerDownLeft /></button>
                </form>
            </div>
        </article>
        {formState.errors.prompt && <span>This field is required</span>}
    </div>
}

