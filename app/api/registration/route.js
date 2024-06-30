import { connectDb } from "@utils/database";
import User from "@models/user";

export const POST = async (request) => {
    const { username, phone, email, password } = await request.json()

    try {
        await connectDb()
        const newuser = new User({ email, username, phone, password })
        await newuser.save()
        return new Response("User created", { status: 201 })
    } catch (error) {
        console.log(error)
    }
}