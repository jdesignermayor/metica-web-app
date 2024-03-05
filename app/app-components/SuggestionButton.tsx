import { Button } from "@/components/ui/button";
import { MistralSuggestionsType, getAIChartData } from "@/lib/actions/mistral-actions";
import { AlignLeft, BarChart3, LineChart, PieChart, ScatterChart, Sparkle } from "lucide-react";
import { useAppStore } from "@store/store";

function CurrentIcon({ type }: { type: string }) {
    switch (type) {
        case 'pie':
            return <PieChart strokeWidth={2} className=" text-[#82fbfb]" />;

        case 'bar':
            return <BarChart3 strokeWidth={2} className=" text-[#faef8d]" />;

        case 'line':
            return <LineChart strokeWidth={2} className=" text-[#aeff9d]" />;

        case 'scatter':
            return <ScatterChart strokeWidth={2} className=" text-[#caabfe]" />;

        case 'table':
            return <AlignLeft strokeWidth={2} className=" text-[#f6a6d9]" />
    }
}

export default function SuggestionButton(props: MistralSuggestionsType) {
    const { getSuggestedChart } = useAppStore();

    const onHandleSuggestion = (item: MistralSuggestionsType) => {
        getSuggestedChart(item);
    }

    return (<Button variant={'outline'} className="flex gap-2 rounded-full text-sm" onClick={() => onHandleSuggestion(props)}>
        <Sparkle className=" text-white" strokeWidth={2} />
        {props.suggestion}
        <div className="flex gap-3 items-center">
            <p>\</p> <CurrentIcon type={props.chart_type} />
        </div>
    </Button>)
}