import { connectDb } from "@utils/database";
import Like from "@models/like";
import Prompt from "@models/prompt";

export const GET = async (req, {params}) => {
    try {
        
        await connectDb()
        const post = await Like.find({ padmin: params.id, isLiked: true }).populate({
            path: "postid",
            populate: {
                path: "padmin",
                model: "User"
            }
        })       
        console.log(post)
        return new Response(JSON.stringify(post), { status: 201 })

    } catch (error) {
        return new Response({ status: 500 })
    }
}