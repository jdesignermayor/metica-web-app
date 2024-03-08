"use server";
import { json2csv } from "json-2-csv";
import { jsonrepair } from 'jsonrepair'
import { NotionDatabasePropertiesType, getDatabaseDataById } from "@actions/notion-actions";

const MISTRAL_MODEL = "mistral-tiny-2312";

export type MistralSuggestionsType = {
    chart_type: string;
    versus: string;
    suggestion: string;
}

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_MISTRAL_API_KEY}`,
    Accept: 'application/json',
};

let counter: number = 0;

export async function getAISuggestions({ databaseInfo }: { databaseInfo: NotionDatabasePropertiesType[] }): Promise<Array<MistralSuggestionsType | []> | undefined> {
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
                    content: `give me useful random #${counter} suggestions in this format(do not change it and not add nested arrays):[{chart_type:type(line,bar,pie,scatter,table,no more),versus:property Type-vs-property Type,suggestion:(should descrive what the user can generate, in spanish, max 20 characters - mandatory)}] about what charts can i generate width that keys, please respond in JSON format,do not add comments`,
                }],
            })
        })

        if (req.status === 200) {
            const response = await req.json();
            try {
                const { choices } = response;
                const currentReponse = choices[0].message.content;
                const reparedResponse = JSON.parse(jsonrepair(currentReponse));
                const parsedResponseArray = reparedResponse?.map((item: any) => item);
                counter++;
                return parsedResponseArray;
            } catch (error) {
                return [];
            }
        }
    }
}

export async function getAIChatResponse({ userPrompt }: { userPrompt: string }) {

    const modelBody = JSON.stringify({
        model: MISTRAL_MODEL,
        messages: [{
            role: "user",
            content: `Based on this prompt: ${userPrompt}`
        }, {
            role: "system",
            content: `give me the axisX(just one x) and axisY(on or multiples) with the following structure: [{chart_type:type(line,bar,pie,scatter,table,no more),versus:property Type-vs-property Type.please respond in JSON format,do not add comments`
        }]
    })

    const req = await fetch(`${process.env.NEXT_MISTRAL_API_URL}/chat/completions`, {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: modelBody,
    })

    if (req.status === 200) {
        const response = await req.json();
        try {
            const { choices } = response;
            console.log('getAIChatResponse:', choices)
        } catch (error) {
            return [];
        }
    }
}

export async function getAIChartData({ databaseId, versus, chart_type, suggestion }: {
    databaseId: string,
    versus: string
    chart_type: string
    suggestion: string
}) {
    console.log('sending getDatabaseDataById fetch ...')
    const databaseInfo = await getDatabaseDataById({ databaseId, isToGetSuggestions: false, pageLimit: 5 });

    const csvProvidingData = json2csv(databaseInfo, {
        expandNestedObjects: false,
        trimHeaderFields: true,
        trimFieldValues: true,
    });

    const req = await fetch(`${process.env.NEXT_MISTRAL_API_URL}/chat/completions`, {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify({
            model: MISTRAL_MODEL,
            messages: [{
                role: "system",
                content: `based this data: ${JSON.stringify(csvProvidingData)}`
            }, {
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

