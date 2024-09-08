import { connectDb } from "@utils/database";
import comments from "@models/comments";

export const GET = async(req, { params }) => {
    console.log(params)
    try {
        await connectDb();
        const postc = await comments.find({ postid: params.id }).populate("padmin")
        return new Response (JSON.stringify(postc), {status:201})
    } catch (error) {
        console.log(error)
    }
}

export const DELETE = async(req, {params}) => {
    try {
        await connectDb()
        await comments.deleteOne({_id: params.id})
        return new Response("Comment deleted", {status:201})
    } catch (error) {
        console.log(error)
    }
}