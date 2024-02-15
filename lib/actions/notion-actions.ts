"use server";

import createSupabaseClient from "../supabase/server";

type NotionActionsType = {
    token: string,
}

export type NotionDatabasesType = {
    id: string;
    title: string;
}

const NOTION_VERSION = '2022-06-28'

const getToken = async () => {
    const supabase = await createSupabaseClient();
    const session = await supabase.auth.getSession();
    const token = session.data?.session?.provider_token;
    return token;
}

export async function getDatabasesInfo(): Promise<Array<NotionDatabasesType | []>> {
    const token = await getToken();
    const DEFAULT_HEADERS = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Notion-Version': NOTION_VERSION,
    };

    try {
        const req = await fetch(`${process.env.NEXT_PUBLIC_NOTION_API_URL}/search`, {
            method: 'POST',
            headers: DEFAULT_HEADERS,
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

export async function getDatabaseData({ databaseID }: { databaseID: string }) {
    const token = await getToken();
    const DEFAULT_HEADERS = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'Notion-Version': NOTION_VERSION,
    };

    try {
        const req = await fetch(`${process.env.NEXT_PUBLIC_NOTION_API_URL}/databases/${databaseID}/query`, {
            method: 'POST',
            headers: DEFAULT_HEADERS,
        })

        const { results } = await req.json();

        if (results.length > 0) {
            return results;
        } else {
            return [];
        }

    } catch (error) {
        return [];
    }
}