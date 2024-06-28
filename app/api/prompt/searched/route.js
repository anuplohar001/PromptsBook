import { connectDb } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
    await connectDb()
    const text = await req.json()

    try {
        const posts = await Prompt.find({prompt: text})
        return new Response(JSON.stringify(posts), {status:201})
    } catch (error) {
        
    }
}