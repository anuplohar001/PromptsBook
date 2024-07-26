import { connectDb } from "@utils/database"
import Like from "@models/like"

export const GET = async (req, { params }) => {
    try {
        await connectDb()
        const data = await Like.findOne({ postid: params.id, padmin: params.userid })
        
        if (data){
            console.log(params)
            return new Response(JSON.stringify(data), { status: 201 })
        }
        
        await Like.create({
            postid: params.id,
            padmin: params.userid,
            isLiked: false
        })
        
        return new Response("Like created", { status: 201 })

    } catch (error) {
        console.log("this is error ", error)
    }
}

export const PATCH = async (req, { params }) => {

    const { isLiked } = await req.json()
    try {
        await connectDb()
        const data = await Like.findOne({ postid: params.id, padmin: params.userid })
        data.isLiked = isLiked
        await data.save()
        console.log(params)
        return new Response("Successfully Liked", {status:201})

    } catch (error) {
        console.log("this is error ", error)
    }

}