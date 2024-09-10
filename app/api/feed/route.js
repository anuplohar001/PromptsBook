import { connectDb } from "@utils/database";
import Prompt from "@models/prompt";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

export const GET = async (request) => {
    try {

        await connectDb();
        const prompt = await Prompt.find({}).populate("padmin");

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {

        return new Response(JSON.stringify({ message: "Failed to fetch all prompts" }), { status: 500 })
    }
};
