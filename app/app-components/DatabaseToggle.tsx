
"use client";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { NotionDatabasesType } from "@/lib/actions/notion-actions"
import { getDatabaseData } from "@actions/notion-actions";
import { useAuthStore } from "@store/store";

export function DatabaseToggle({ databases }: any) {
    const { setDatabaseData, setIsLoading } = useAuthStore((state: any) => state);

    const handleChange = async (value: string) => {
        await setIsLoading();
        const databaseIdData = await getDatabaseData({  databaseID: value });
        setDatabaseData({ databaseData: databaseIdData })
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
