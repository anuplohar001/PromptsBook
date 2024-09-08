import { connectDb } from "@utils/database";
import Prompt from "@models/prompt";
import Like from "@models/like";

export const GET = async (req, { params }) => {

    try {
        await connectDb()
        const data = await Prompt.findOne({ _id: params.id }).populate("padmin")
        
        return new Response(JSON.stringify(data), { status: 201 })

    } catch (error) {
        console.log(error)
    }

}


export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();
    try {
        await connectDb()

        const data = await Prompt.findOne({ _id: params.id })
        data.prompt = prompt;
        data.tag = tag;

        await data.save()
        return new Response("Succefully edited", { status: 201 })

    } catch (error) {

        console.log(error)
    }
}

export const DELETE = async (req, {params}) => {
    try {
        await connectDb()
        await Prompt.deleteOne({_id: params.id})
        await Like.deleteMany({postid: params.id})
        return new Response("Post Deleted", {status:201})
    } catch (error) {
        console.log(error)
    }
}