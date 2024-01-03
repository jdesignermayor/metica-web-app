import { NextRequest, NextResponse } from "next/server";
import dataJson from "@/utils/fakeDatabase.json";
import markdownit from "markdown-it";

const md = markdownit()

export async function POST(req: NextRequest, context: { params: any }) {
    const { userPrompt } = await req.json();
    let jsonResponse = null;

    const questionPrompt = `${userPrompt} and organize them into a csv format with categories and total sums, structured as results_#(number of array list): [{ description, total(as string), barColor(ramdon hex color) }], please do not add comments in each value.`
    console.log('sending post...')
    const contextPrompt = `based of this json data: ${JSON.stringify(dataJson)}`;
    const response = await fetch(`${process.env.NEXT_MISTRAL_URL_API}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_MISTRAL_KEY_API}`
        },
        body: JSON.stringify({
            model: "mistral-tiny",
            messages: [
                {
                    role: "system",
                    content: contextPrompt,
                },
                {
                    role: "user",
                    content: questionPrompt
                }
            ],
            top_p: 1,
            stream: false,
            safe_mode: false,
            random_seed: null
        })
    })
    const { id, object, created, model, choices, usage } = await response.json();
    const { message: { content } } = choices[0];

    try {
        console.log('content:', content);

        var str = "translate(737.4170532226562,136.14541625976562)";
        var args = /([\d\.]+),([\d\.]+)/.exec(str)
        var a1 = args[1], a2 = args[2];

        const found = content.match(/['```csv']['```']+/g).map(function(p){ return p.substring(1); });
        console.log('found:', found)

        return NextResponse.json({
            status: 200,
            message: 'success',
            result: jsonResponse || {}
        })

    } catch (error) {
        console.log('error found:', error)
        return NextResponse.json({
            status: 400,
            message: error,
        })
    }
}