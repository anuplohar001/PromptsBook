import { connectDb } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async(request) => {

    const {prompt, tag, padmin} = await request.json()
    try {

        await connectDb();
        const newp = new Prompt({prompt, tag, padmin})
        await newp.save();
        return new Response(JSON.stringify(newp), {status:201})
        
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error occured" }), { status: 500 })
    }
}