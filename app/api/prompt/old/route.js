import { connectDb } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {

    try {
        
        await connectDb();
        const prompt = await Prompt.find({}).populate("padmin");
        return new Response(JSON.stringify(prompt), {status:201})

    } catch (error) {
        console.log("this is error = " + error)
    }
}