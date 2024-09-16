import { connectDb } from "@utils/database";
import Story  from "@models/story";
export const dynamic = 'force-dynamic';

export const GET = async() => {
    try {
        await connectDb()
        const story = await Story.find({})
        if(story)
            return new Response(JSON.stringify(story), {status:200})
        return new Response(JSON.stringify({message: "NO Stories"}), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({message:"Error"}), { status: 500 })
    }
}

export const POST = async (request) => {

    var m = new Date();
    var expiresAfter = m.getFullYear() + "/" + (m.getMonth() + 1) + "/" + m.getDate() + " " + m.getHours() + ":" + (m.getMinutes() + 1) + ":" + m.getSeconds();
    console.log(expiresAfter)
    try {

        await connectDb();
        const newp = new Story({prompt:"hi anup", expiresAfter })
        await newp.save();
        return new Response(JSON.stringify(newp), { status: 201 })

    } catch (error) {
        return new Response(JSON.stringify({ message: "Error occured" }), { status: 500 })
    }
}