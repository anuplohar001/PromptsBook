import { connectDb } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, {params}) =>{

    try {
        
        await connectDb()

        const post = await Prompt.find({padmin: params.id}).populate("padmin")
        
        return new Response(JSON.stringify(post), {status:201})

    } catch (error) {
        return new Response({status:500})
    }
}