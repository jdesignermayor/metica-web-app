"use server";

import createSupabaseClient from "@supabase-server/server"

export async function signOutFromNotion() {
    const supabase = await createSupabaseClient();
    await supabase.auth.signOut();
}

export async function readUserSession() {
    const supabase = await createSupabaseClient();
    return supabase.auth.getSession();
}