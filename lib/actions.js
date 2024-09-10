'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export async function revalidateFeed() {
    revalidateTag('feed')
}

export async function revalidateUser() {
    revalidateTag('user')
    redirect('/')
}

export async function revalidateAll() {
    revalidatePath('/')
    redirect('/')
}