import { connectDb } from "@utils/database";
import User from "@models/user";

export const GET = async (req, { params }) => {
    try {
        await connectDb()
        const user = await User.findOne({_id: params.id})
        return new Response(JSON.stringify(user), { status: 200 })

    } catch (error) {
        return new Response(JSON.stringify({ message: "Error occured" }), { status: 500 })
    }
}

export const PATCH = async (req, {params}) => {
    const {username, email, password} = await req.json()
    

    try {
        await connectDb()
        const user = await User.findOne({ _id: params.id })
        
        user.username = username    
        user.password = password        
        user.email = email
        
        console.log(user.password)

        await user.save()


        return new Response(JSON.stringify("Profile Edited"), {status: 200})

    } catch (error) {
        return new Response(JSON.stringify({ message: "Error occured" }), { status: 500 })
    }
}