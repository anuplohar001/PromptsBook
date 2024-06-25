import { connectDb } from "@utils/database"
import Like from "@models/like"

export const GET = async (req, { params }) => {

    try {
        await connectDb()
        const data = await Like.findOne({ postid: params.id, userid: params.userid })

        if (data)
            return new Response(JSON.stringify(data), { status: 201 })

        await Like.create({
            postid: params.id,
            userid: params.userid,
            isLiked: false
        })

        return new Response("Like created", { status: 201 })

    } catch (error) {
        console.log(error)
    }
}

export const PATCH = async (req, { params }) => {
    const { isLiked } = await req.json()
    try {
        await connectDb()
        const data = await Like.findOne({ postid: params.id, userid: params.userid })
        data.isLiked = isLiked

        await data.save()

        return new Response("Successfully Liked", {status:201})

    } catch (error) {
        console.log(error)
    }

}