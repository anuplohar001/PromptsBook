import { connectDb } from "@utils/database";
import Like from "@models/like";

export const GET = async(req, {params}) => {

    try {
        await connectDb()
        const data = await Like.find({postid:params.id, isLiked:true})
        return new Response(JSON.stringify(data), {status:201})
    } catch (error) {
        console.log(error)
    }
}