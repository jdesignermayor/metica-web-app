"use server";
import { json2csv } from "json-2-csv";
import { jsonrepair } from 'jsonrepair'
import { NotionDatabasePropertiesType } from "./notion-actions";

export type MistralSuggestionsType = {
    chart_type: string;
    versus: string;
    suggestion: string;
}

export async function getAISuggestions({ databaseInfo }: { databaseInfo: NotionDatabasePropertiesType[] }): Promise<Array<MistralSuggestionsType | []> | undefined> {
    const DEFAULT_HEADERS = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_MISTRAL_API_KEY}`,
        Accept: 'application/json',
    };

    const csvProvidingData = json2csv(databaseInfo, {
        expandNestedObjects: false,
        trimHeaderFields: true,
        trimFieldValues: true,
    });

    if (databaseInfo?.length > 0) {

        // console.log('csvProvidingData: ', csvProvidingData);

        const req = await fetch(`${process.env.NEXT_MISTRAL_API_URL}/chat/completions`, {
            method: 'POST',
            headers: DEFAULT_HEADERS,
            body: JSON.stringify({
                model: "mistral-tiny",
                messages: [{
                    role: "system",
                    content: `based on the key of every property: ${JSON.stringify(csvProvidingData)}`
                }, {
                    role: "user",
                    content: "give me useful suggestions(spanish) in this format(do not change it):[{chart_type:type(line,bar,pie,scatter,table,no more),versus:val1-vs-val2,suggestion(max 55 characters)}] about what charts can i generate width that keys, please respond in JSON format,do not add comments"
                }]
            })
        })

        if (req.status === 200) {
            const response = await req.json();
            try {
                const { choices } = response;
                const currentReponse = choices[0].message.content;
                const reparedResponse = JSON.parse(jsonrepair(currentReponse));
                const parsedResponseArray = reparedResponse?.map((item: any) => item);
                return parsedResponseArray;

            } catch (error) {
                return [];
            }
        }
    }
}