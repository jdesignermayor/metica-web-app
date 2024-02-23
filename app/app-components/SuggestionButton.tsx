import { Button } from "@/components/ui/button";
import IconPie from "@icons/IconPie";
import IconBar from "@icons/IconBar";
import IconLine from "@icons/IconLine";
import IconScatter from "@icons/IconScatter";

function CurrentIcon({ type }: { type: string }) {
    switch (type) {
        case 'pie':
            return <IconPie />;

        case 'bar':
            return <IconBar />;

        case 'line':
            return <IconLine />;

        case 'scatter':
            return <IconScatter />;
    }
}

export default function SuggestionButton({ suggestionText, chartType = '' }: { suggestionText: string, chartType: string }) {
    return (<Button variant={'outline'} className="flex gap-2 rounded-full text-sm">
        <CurrentIcon type={chartType} />
        {suggestionText}
    </Button>)
}