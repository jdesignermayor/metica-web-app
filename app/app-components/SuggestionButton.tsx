import { Button } from "@/components/ui/button";
import { AlignLeft, BarChart3, LineChart, PieChart, ScatterChart, Sparkle } from "lucide-react";

function CurrentIcon({ type }: { type: string }) {
    switch (type) {
        case 'pie':
            return <PieChart strokeWidth={2} className=" text-[#82fbfb]" />;

        case 'bar':
            return <BarChart3 strokeWidth={2} className=" text-[#faef8d]" />;

        case 'line':
            return <LineChart strokeWidth={2} className=" text-[#aeff9d]"/>;

        case 'scatter':
            return <ScatterChart strokeWidth={2} className=" text-[#caabfe]" />;

        case 'table':
            return <AlignLeft strokeWidth={2} className=" text-[#f6a6d9]" />
    }
}

export default function SuggestionButton({ suggestionText, chartType = '' }: { suggestionText: string, chartType: string }) {
    return (<Button variant={'outline'} className="flex gap-2 rounded-full text-sm">
        <Sparkle className=" text-white" strokeWidth={2} />
        {suggestionText}
        <div className="flex gap-3 items-center">
            <p>\</p> <CurrentIcon type={chartType} />
        </div>
    </Button>)
}