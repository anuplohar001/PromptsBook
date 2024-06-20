"use client"

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
const Card = ({ post }) => {
    
    const router = useRouter();
    const { data: session } = useSession()
    
    const EditPost = () => {
        router.push(`/edit-prompt?id=${post._id}`)
    }

    return (

        <div className='prompt_card'>
            <div className='flex gap-4 font-semibold'>
          
                <Image
                    src={post.padmin.image}
                    
                    alt='Profile Img'
                    width={35}
                    height={35}
                    className='rounded-2xl'
                />
                <div>
                    <div>{post.padmin.username}</div>
                    <div>{post.padmin.email}</div>

                </div>
            </div>
            <div className='font-semibold'>
                <div>{post.prompt}</div>
                <div>{post.tag}</div>
            </div>
            {
                session?.user && (
                    <div className='flex gap-5 justify-center font-medium'>
                        <button onClick={EditPost} className='text-green-700'>
                            Edit
                        </button>
                        <button className='text-red-700'>Delete</button>
                    </div>
                )
            }
        </div>

    )
}

export default Card
