"use server";
const useNotion = () => {
    const getToken = async ({ code }: { code: string }) => {
        // encode in base 64
        const encoded = Buffer.from(`${process.env.NEXT_NOTION_OAUTH_CLIENT_ID}:${process.env.NEXT_NOTION_OAUTH_CLIENT_SECRET}`).toString("base64")

        console.log('encoded:', encoded)
        const response = await fetch("https://api.notion.com/v1/oauth/token", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Basic ${encoded}`,
            },
            body: JSON.stringify({
                grant_type: "authorization_code",
                code,
                redirect_uri: 'https://wynjnahuieszknwkwnor.supabase.co/auth/v1/callback',
            }),
        });

        const data = await response.json();
        console.log('data response:', data)
    }

    return {
        getToken
    }
}

export default useNotion;