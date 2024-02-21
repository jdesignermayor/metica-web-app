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

export type NotionDatabasePropertiesType = {
    id: string;
    created_time: string;
    properties: string | null;
}

const NOTION_VERSION = '2022-06-28'

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

export async function getDatabaseDataById({ databaseId }: { databaseId: string }): Promise<Array<NotionDatabasePropertiesType>> {
    const headers = await getHeaders();

    try {
        const req = await fetch(`${process.env.NEXT_PUBLIC_NOTION_API_URL}/databases/${databaseId}/query`, {
            headers,
            method: 'POST',
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
            })

            return computedDabaseInfo;
        } else {
            return [];
        }

    } catch (error) {
        return [];
    }
}