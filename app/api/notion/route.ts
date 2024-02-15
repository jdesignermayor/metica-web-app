import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import createSupabaseClient from "@/lib/supabase/server";


export async function POST(req: NextRequest, res: NextResponse) {
    const cookieStore = cookies()
    const supabase = await createSupabaseClient(cookieStore);

    const { data } = await supabase.auth.getSession();
    const token = data?.session?.provider_token;
    console.log('data:', data)

    if (token && token.length > 0) {

        return NextResponse.json({
            message: "Hello, world!"
        })
    } else {
        return NextResponse.json({
            message: "No token found",
            status: 401,
        })
    }
}