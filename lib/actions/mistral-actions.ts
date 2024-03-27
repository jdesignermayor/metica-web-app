"use server";
import { json2csv } from "json-2-csv";
import { jsonrepair } from 'jsonrepair'
import { NotionDatabasePropertiesType, getDatabaseDataById } from "@actions/notion-actions";
import createSupabaseClient from "@supabase-server/server"

const MISTRAL_MODEL = "mistral-tiny-2312";

export type MistralSuggestionsType = {
    chart_type: string;
    versus: string;
    suggestion: string;
}

type FieldMultiSelectType = {
    id: string,
    name: string,
    color: string,
}

type FieldNumberType = {
    id: string;
    type: string;
    number: number;
}

type FieldNameTitleType = {
    type: string;
    text: Array<FieldNameTextType | []>;
    annotations?: any;
    plain_text: string;
    href?: null;
}

type FieldNameTextType = {
    content: string;
    link?: null | string;
}

enum FieldsTypeList {
    LAST_EDITED_BY = 'last_edited_by',
    MULTI_SELECT = 'multi_select',
    NUMBER = 'number',
    TITLE = 'title',
}

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_MISTRAL_API_KEY}`,
    Accept: 'application/json',
};

let counter: number = 0;
let selectedDatabaseId: string = '';

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
                    content: `give me useful random #${counter} suggestions in this format(do not change it and not add nested arrays):[{chart_type:type(line,bar,pie,scatter,no more),versus:property Type-vs-property Type,suggestion:(should descrive what the user can generate, in spanish, max 20 characters - mandatory)}] about what charts can i generate width that keys, please respond in JSON format,do not add comments`,
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

let modelHistory = [{
    role: "system",
    content: "context: this is the list of avaliable chart types:line,bar,pie,scatter,no more."
}, {
    role: "system",
    content: `context: this is the structure for every chart type: 
    LineChart/BarChart/ScatterChart should return(mandatory): data[{name(axisX): val(do not nested values),...comparison(axisY one or multiple),}] 
    PieChart should return(mandatory): data[{name: val(do not nested values),value}]`
}];

export async function getSummarizedData({ databaseId }: { databaseId: string }) {
    const databaseData = await getDatabaseDataById({ databaseId, pageLimit: 15 });

    const mappedData = databaseData?.map(({ id, properties }: any) => {
        const transformedObj = Object.keys(properties).map(key => {
            let val = '' as any;
            switch (properties[key].type) {
                case FieldsTypeList.LAST_EDITED_BY:
                    const lastEditedByValue = properties[key][FieldsTypeList.LAST_EDITED_BY]?.name;
                    val = lastEditedByValue;
                    break;

                case FieldsTypeList.MULTI_SELECT:
                    const multiSelectValues = properties[key][FieldsTypeList.MULTI_SELECT]?.map(({ name }: FieldMultiSelectType) => ({ name })) || [];
                    val = multiSelectValues;
                    break;

                case FieldsTypeList.NUMBER:
                    const numberValue = properties[key] as FieldNumberType;
                    val = numberValue.number;
                    break;

                case FieldsTypeList.TITLE:
                    const nameValue = properties[key]?.title[0] as FieldNameTitleType;
                    val = nameValue.plain_text;
                    break;
            }
            return {
                key: key.toLowerCase(),
                values: val,
            }
        });

        return {
            id,
            values: transformedObj,
        };
    });

    console.log('mappedData:', JSON.stringify(mappedData))
}

export async function getAIChatResponse({ userPrompt, databaseId }: { userPrompt: string, databaseId: string }) {
    const databaseData = await getDatabaseDataById({ databaseId, pageLimit: 15 });
    // const supabase = await createSupabaseClient();




    // 1 I need to create a database with key - value 
    console.log('databaseData:', databaseData)



    // console.log('databaseData:', JSON.stringify(databaseData))
    // const csvProvidingData = json2csv(databaseData, {
    //     expandNestedObjects: false,
    //     trimHeaderFields: true,
    //     trimFieldValues: true,
    // });

    // modelHistory.push({
    //     role: "system",
    //     content: "based on this data: " + JSON.stringify(csvProvidingData)
    // })
    // modelHistory.push({
    //     role: "user",
    //     content: " the user needs:" + JSON.stringify(userPrompt)
    // })

    // console.log('modelHistory:', [...modelHistory])

    // const req = await fetch(`${process.env.NEXT_MISTRAL_API_URL}/chat/completions`, {
    //     method: 'POST',
    //     headers: DEFAULT_HEADERS,
    //     body: JSON.stringify([...modelHistory]),
    // })

    // if (req.status === 200) {
    //     const response = await req.json();
    //     try {
    //         const { choices } = response;
    //         counter++;
    //         console.log('model response: ', response)
    //         return JSON.stringify(choices)
    //     } catch (error) {
    //         return [];
    //     }
    // }
}

// export async function getAIChartData({ databaseId, versus, chart_type, suggestion }: {
//     databaseId: string,
//     versus: string
//     chart_type: string
//     suggestion: string
// }) {
//     console.log('sending getDatabaseDataById fetch ...')
//     const databaseInfo = await getDatabaseDataById({ databaseId, isToGetSuggestions: false, pageLimit: 5 });

//     const csvProvidingData = json2csv(databaseInfo, {
//         expandNestedObjects: false,
//         trimHeaderFields: true,
//         trimFieldValues: true,
//     });

//     const req = await fetch(`${process.env.NEXT_MISTRAL_API_URL}/chat/completions`, {
//         method: 'POST',
//         headers: DEFAULT_HEADERS,
//         body: JSON.stringify({
//             model: MISTRAL_MODEL,
//             messages: [{
//                 role: "system",
//                 content: `based this data: ${JSON.stringify(csvProvidingData)}`
//             }, {
//                 role: "system",
//                 content: `return this correct format:(do not change it): [{
//                     name: val(do not nested values),
//                     ...comparison,
//                 }]`
//             }, {
//                 role: "user",
//                 content: `make accurate: ${suggestion}(grab title from data), compare:${versus}, please respond in JSON format, do not add comments`
//             }]
//         })
//     })

//     if (req.status === 200) {
//         const response = await req.json();
//         try {
//             const { choices } = response;
//             const currentReponse = choices[0].message.content;
//             const reparedResponse = JSON.parse(jsonrepair(currentReponse));
//             const parsedResponseArray = reparedResponse?.map((item: any) => item);
//             console.log('parsedResponseArray: ', JSON.stringify(parsedResponseArray))

//         } catch (error) {
//             return [];
//         }

//     }
//     // console.log('csvProvidingData:', csvProvidingData)
// }

