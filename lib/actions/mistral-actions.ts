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
        const req = await fetch(`${process.env.NEXT_MISTRAL_API_URL}/chat/completions`, {
            method: 'POST',
            headers: DEFAULT_HEADERS,
            body: JSON.stringify({
                model: "mistral-tiny",
                messages: [{
                    role: "system",
                    content: `based on this data: ${JSON.stringify(csvProvidingData)}`
                }, {
                    role: "user",
                    content: "give me suggestions in this mandatory format: [{ chart_type: type(line,bar,pie,etc...), versus: val1-vs-val2, suggestion(shorter) }] about what charts can i generate whit that data, please respond in json format, do not add comments."
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