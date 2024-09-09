import { connectDb } from "@utils/database";
import Like from "@models/like";

export const GET = async (req, { params }) => {
    try {

        await connectDb()
        const post = await Like.find({ padmin: params.id, isLiked: true }).populate({
            path: "postid",
            populate: {
                path: "padmin",
                model: "User"
            }
        })

        return new Response(JSON.stringify(post), { status: 201 })

    } catch (error) {
        return new Response(JSON.stringify({ message: "Error occured" }), { status: 500 })
    }
}