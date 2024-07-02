import { connectDb } from "@utils/database";
import Prompt from "@models/prompt";
import { NextResponse } from "next/server";
export const GET = async (req) => {

    try {
        
        await connectDb();
        const prompt = await Prompt.find({}).populate("padmin");

        return new NextResponse(JSON.stringify(prompt), {status:200})

    } catch (error) {

        return new NextResponse("Failed to fetch all prompts", { status: 500 })
    }
}