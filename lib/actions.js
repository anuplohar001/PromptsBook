'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'


export const checkEnvironment = () => {
    let base_url =
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "http://prompts-book.vercel.app";

    return base_url;
}

export async function revalidateFeed() {
    revalidateTag('feed')
    
}

export async function revalidateUser() {
    revalidateTag('usersposts')
   
}

export async function revalidatePost() {
    revalidateTag('myposts')

}

export async function revalidateAll() {
    revalidatePath('/')
}