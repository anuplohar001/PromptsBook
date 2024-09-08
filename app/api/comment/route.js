import { connectDb } from "@utils/database";
import comments from "@models/comments";


export const POST = async(request) => {
    const {postid, padmin, comment} = await request.json()
    try{
        await connectDb();
        const newcomment = new comments({postid, padmin, comment})
        await newcomment.save();
        return new Response(JSON.stringify(newcomment), {status:201})
    } catch (error) {
        console.log(error)
    }
}