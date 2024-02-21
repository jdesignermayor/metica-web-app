
"use client";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { NotionDatabasesType } from "@/lib/actions/notion-actions"
import { getDatabaseDataById } from "@actions/notion-actions";
import { getSuggestions } from "@actions/mistral-actions";

export function DatabaseToggle({ databases }: any) {
    const handleChange = async (value: string) => {
        // await setIsLoading();
        const databaseIdData = await getDatabaseDataById({ databaseId: value });
        console.log('databaseIdData:', JSON.stringify(databaseIdData))
        // const mistralSuggestions = await getSuggestions({ databaseInfo: databaseIdData });
        // if (mistralSuggestions && mistralSuggestions.length > 0) {
        //     console.log('mistralSuggestions:', mistralSuggestions)
        //     console.log('mistralSuggestions:', typeof(mistralSuggestions))
        //     setSuggestionsData({ suggestionsData: mistralSuggestions })
        // }
    }

    return (
        <form>
            {
                databases?.length > 0 &&
                <RadioGroup defaultValue="0" onValueChange={handleChange}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value={"0"} id={`id-`} />
                        <Label htmlFor={`id-`}>No one</Label>
                    </div>
                    {
                        databases?.length > 0 && databases?.map((item: NotionDatabasesType, index: any) => (
                            <div key={index} className="flex items-center space-x-2">
                                <RadioGroupItem value={item.id} id={`id-${index}`} />
                                <Label htmlFor={`id-${index}`}>{item.title}</Label>
                            </div>
                        ))
                    }
                </RadioGroup>
            }
        </form>
    )
}
