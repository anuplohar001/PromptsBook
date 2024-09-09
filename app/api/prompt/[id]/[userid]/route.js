import { connectDb } from "@utils/database"
import Like from "@models/like"

export const GET = async (req, { params }) => {
    try {
        await connectDb()
        const data = await Like.findOne({ postid: params.id, padmin: params.userid })
        
        if (data){
            return new Response(JSON.stringify(data), { status: 201 })
        }
        
        await Like.create({
            postid: params.id,
            padmin: params.userid,
            isLiked: false
        })
        
        return new Response(JSON.stringify({ message: "Done !!!" }), { status: 500 })

    } catch (error) {
        return new Response(JSON.stringify({ message: "Error occured" }), { status: 500 })
    }
}

export const PATCH = async (req, { params }) => {

    const { isLiked } = await req.json()
    try {
        await connectDb()
        const data = await Like.findOne({ postid: params.id, padmin: params.userid })
        data.isLiked = isLiked
        await data.save()
        return new Response(JSON.stringify({ message: "Done" }), { status: 500 })

    } catch (error) {
        return new Response(JSON.stringify({ message: "Error occured" }), { status: 500 })
    }

}