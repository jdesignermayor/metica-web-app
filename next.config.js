/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_NOTION_API_KEY: process.env.NEXT_NOTION_API_KEY,
        NEXT_NOTION_OAUTH_CLIENT_ID: process.env.NEXT_NOTION_OAUTH_CLIENT_ID,
        NEXT_NOTION_OAUTH_CLIENT_SECRET: process.env.NEXT_NOTION_OAUTH_CLIENT_SECRET,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }
}

module.exports = nextConfig
