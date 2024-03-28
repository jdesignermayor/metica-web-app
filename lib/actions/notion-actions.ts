"use server";
import createSupabaseClient from "../supabase/server";

type NotionDatabaseReponseType = {
    id: string;
    object: string;
    created_time: string;
    last_edited_time: string;
    created_by: {
        object: string;
        id: string;
    },
    last_edited_by: {
        object: string;
        id: string;
    },
    cover: null;
    icon: {
        type: string;
        emoji: string;
    },
    parent: {
        type: string;
        database_id: string;
    }
    archived: false;
    properties: null;
    url: string;
    public_url: null;
}

export type NotionDatabasesType = {
    id: string;
    title: string;
}

type NotionProperties = {
    id: string;
    type: string;
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


export type NotionDatabasePropertiesType = {
    id: string;
    created_time: string;
    properties: Array<NotionProperties> | null;
}

const NOTION_VERSION = '2022-06-28';
const DEFAULT_PAGES_LIMIT = 100;

const getHeaders = async () => {
    const supabase = await createSupabaseClient();
    const session = await supabase.auth.getSession();
    const token = session.data?.session?.provider_token;

    const DEFAULT_HEADERS = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Notion-Version': NOTION_VERSION,
    };

    return DEFAULT_HEADERS;
}

export async function getDatabases(): Promise<Array<NotionDatabasesType | []>> {
    const headers = await getHeaders();

    try {
        const req = await fetch(`${process.env.NEXT_PUBLIC_NOTION_API_URL}/search`, {
            method: 'POST',
            headers,
            body: JSON.stringify(
                {
                    "filter": {
                        "value": "database",
                        "property": "object"
                    }
                })
        })

        const { results } = await req.json();

        if (results.length > 0) {
            const databasesID = results?.map(({ id, title }: any) => {
                return {
                    title: title[0].plain_text,
                    id
                }
            })

            return databasesID;
        } else {
            return [];
        }

    } catch (error) {
        return [];
    }
}


export async function getDatabaseDataById({ databaseId, pageLimit = DEFAULT_PAGES_LIMIT }: { databaseId: string, pageLimit: number }): Promise<Array<NotionDatabasePropertiesType> | []> {
    const headers = await getHeaders();
    console.log('databaseId:', databaseId)
    try {
        const req = await fetch(`${process.env.NEXT_PUBLIC_NOTION_API_URL}/databases/${databaseId}/query`, {
            headers,
            method: 'POST',
            body: JSON.stringify({ page_size: pageLimit }),
        })

        const { results } = await req.json();

        if (results.length > 0) {
            const databaseInfo = results as Array<NotionDatabaseReponseType>;

            const computedDabaseInfo: Array<NotionDatabasePropertiesType> = databaseInfo.map((item: NotionDatabaseReponseType) => {
                return {
                    id: item.id,
                    created_time: item.created_time,
                    properties: item.properties
                }
            });

            return computedDabaseInfo;

        } else {
            return [];
        }

    } catch (error) {
        return [];
    }
}

export async function getSummarizedData({ databaseId }: { databaseId: string }) {
    const supabase = await createSupabaseClient();
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

    mappedData?.map(({ id, values }) => {
        values?.map(async ({ key, values: dataValues }) => {
            console.log(`id: ${id}, key: ${key}, value: ${dataValues}`)
            // const { error } = await supabase
            // .from('tbl_user_databases')
            // .insert({ id, key, value: dataValues  })
        })
    })

    console.log('mappedData:', JSON.stringify(mappedData))
}

export async function getDatabaseDataByIdToSuggestions({ databaseId, pageLimit = DEFAULT_PAGES_LIMIT }: { databaseId: string, isToGetSuggestions: boolean, pageLimit: number }): Promise<Array<NotionDatabasePropertiesType> | any> {
    const headers = await getHeaders();


    try {
        const req = await fetch(`${process.env.NEXT_PUBLIC_NOTION_API_URL}/databases/${databaseId}/query`, {
            headers,
            method: 'POST',
            body: JSON.stringify({ page_size: 2 }),
        })
        const { results } = await req.json();

        if (results.length > 0) {
            const databaseInfo = results as Array<NotionDatabaseReponseType>;

            const computedDabaseInfo: Array<NotionDatabasePropertiesType> = databaseInfo.map((item: NotionDatabaseReponseType) => {
                return {
                    id: item.id,
                    created_time: item.created_time,
                    properties: item.properties
                }
            });

            const removeDatabaseInfoValues = computedDabaseInfo.map((props) => {
                let myObject = props.properties;
                return {
                    properties: myObject
                }
            });
            return removeDatabaseInfoValues;
        } else {
            return [];
        }

    } catch (error) {
        return [];
    }
}
