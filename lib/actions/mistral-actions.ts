"use server";
import { json2csv } from "json-2-csv";
import { jsonrepair } from 'jsonrepair'
import { NotionDatabasePropertiesType, getDatabaseDataById } from "@actions/notion-actions";

const MISTRAL_MODEL = "open-mixtral-8x7b";

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
                model: MISTRAL_MODEL,
                messages: [{
                    role: "system",
                    content: `based on the key of every property: ${JSON.stringify(csvProvidingData)}`
                }, {
                    role: "user",
                    content: "give me useful suggestions(use spanish) in this format(do not change it and not add nested arrays):[{chart_type:type(line,bar,pie,scatter,table,no more),versus:property Type-vs-property Type,suggestion(max 20 characters - mandatory)}] about what charts can i generate width that keys, please respond in JSON format,do not add comments"
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

export async function getAIChartData({ databaseId, versus, chart_type, suggestion }: {
    databaseId: string,
    versus: string
    chart_type: string
    suggestion: string
}) {
    const DEFAULT_HEADERS = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_MISTRAL_API_KEY}`,
        Accept: 'application/json',
    };

    console.log('sending getDatabaseDataById fetch ...')
    const databaseInfo = await getDatabaseDataById({ databaseId, isToGetSuggestions: false, pageLimit: 5 });

    const csvProvidingData = json2csv(databaseInfo, {
        expandNestedObjects: false,
        trimHeaderFields: true,
        trimFieldValues: true,
    });

    console.log('csvProvidingData:', csvProvidingData)
    console.log('sending completions fetch ...')
    const req = await fetch(`${process.env.NEXT_MISTRAL_API_URL}/chat/completions`, {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify({
            model: MISTRAL_MODEL,
            messages: [{
                role: "system",
                content: `based this data: ${JSON.stringify(csvProvidingData)}`
            },{
                role: "system",
                content: `return this correct format:(do not change it): [{
                    name: val(do not nested values),
                    ...comparison,
                }]`
            }, {
                role: "user",
                content: `make accurate: ${suggestion}(grab title from data), compare:${versus}, please respond in JSON format, do not add comments`
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
            console.log('parsedResponseArray: ', JSON.stringify(parsedResponseArray))

        } catch (error) {
            return [];
        }
     
    }
    // console.log('csvProvidingData:', csvProvidingData)
}

