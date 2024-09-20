import { connectDb } from "@utils/database";
import User from "@models/user";

export const GET = async () => {
    try {
        await connectDb()
        const users = await User.find({})
        
        return new Response(JSON.stringify(users), {status:200})
    } catch (error) {
        return new Response(JSON.stringify("Fail to fetch all users"), {status:500})
    }
}