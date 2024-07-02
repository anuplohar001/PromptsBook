import { connectDb } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async () => {

    try {
        
        await connectDb();
        const prompt = await Prompt.find({}).populate("padmin");

        return new Response(JSON.stringify(prompt), {status:200})

    } catch (error) {

        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}