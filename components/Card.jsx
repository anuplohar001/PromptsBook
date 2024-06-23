"use client"

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Card = ({ post, modify }) => {

    const router = useRouter();
    const { data: session } = useSession()

    const userProfile = () =>{
        if(post.padmin._id === session?.user.id){
            router.push(`/profile`)
        }
        else
            router.push(`/profile/${post.padmin._id}?name=${post.padmin.username}`)
    }

    const DeletePost = async () => {
        confirm("Are you sure you want to delete this post")

        if (confirm) {
            const response = await fetch(`api/prompt/${post._id}`, {
                method: "DELETE"
            })
            if (response.ok) {
                alert("Post Deleted Successfully")
                router.push("/")
            }
        }
    }

    const EditPost = () => {
        router.push(`/edit-prompt?id=${post._id}`)
    }

    return (

        <div className='prompt_card'>
            <div className='flex gap-4'>
                    <Image
                        src={post.padmin.image}
                        alt='Profile Img'
                        width={40}
                        height={40}
                        className='rounded-full object-contain'
                        onClick={userProfile}
                    />
                <div className=''>
                    <div className='font-bold'>{post.padmin.username}</div>
                    <div>{post.padmin.email}</div>

                </div>
            </div>
            <div className='font-semibold overflow-y-scroll'>
                <div className='mt-5'>{post.prompt}</div>
                <div className='mt-5 text-violet-700'>#{post.tag}</div>
            </div>
            {
                modify && (
                    <div className='flex gap-5 justify-center font-medium'>
                        <button onClick={EditPost} className='text-green-700'>
                            Edit
                        </button>
                        <button onClick={DeletePost} className='text-red-700'>Delete</button>
                    </div>
                )
            }
        </div>

    )
}

export default Card
