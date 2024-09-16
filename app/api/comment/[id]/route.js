import { connectDb } from "@utils/database";
import comments from "@models/comments";

export const GET = async(req, { params }) => {
    console.log(params)
    try {
        await connectDb();
        const postc = await comments.find({ postid: params.id }).populate("padmin")
        return new Response (JSON.stringify(postc), {status:201})
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error occured" }), { status: 500 })
    }
}

export const DELETE = async(req, {params}) => {
    try {
        await connectDb()
        await comments.deleteOne({_id: params.id})
            (JSON.stringify({ message: "Comment deleted"}), {status:201})
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error occured" }), { status: 500 })
    }
}