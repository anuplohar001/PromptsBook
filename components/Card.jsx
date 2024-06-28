"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Like from '@public/assets/like.svg'
import unLike from '@public/assets/unlike.svg'

const Card = ({ post, modify }) => {

    const router = useRouter();
    const { data: session } = useSession()
    const [Likes, setLikes] = useState({ isLiked: false })

    useEffect(() => {
        const getLikes = async () => {
            try {
                const response = await fetch(`api/prompt/${post._id}/${session?.user.id}`, {
                    method: "GET"
                })
                const data = await response.json()
                setLikes({ isLiked: data.isLiked });


            } catch (error) {
                console.log(error)
            }
        }

        if (session?.user.id) getLikes()

    }, [session?.user.id])


    const userProfile = () => {
        if (post.padmin._id === session?.user.id) {
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

    const handleLike = async () => {

        var flag = Likes.isLiked
        if (Likes.isLiked === true) {
            setLikes({ isLiked: false })
            flag = false
        }
        else {
            flag = true
            setLikes({ isLiked: true })
        }

        try {
            const response = await fetch(`api/prompt/${post._id}/${session?.user.id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    isLiked: flag
                })
            })

        } catch (error) {
            console.log(error)
        }

    }



    return (

        <div className='prompt_card' onDoubleClick={handleLike}>

            <div className='ml-1 flex gap-4 hover:cursor-pointer' onClick={userProfile}>
                <Image
                    src={post.padmin.image}
                    alt='Profile Img'
                    width={40}
                    height={40}
                    className='rounded-full object-contain'
                    
                />
                <div className=''>
                    <div className='font-bold'>{post.padmin.username}</div>
                    <div>{post.padmin.email}</div>

                </div>
            </div>
            <div className='mt-3 h-[130px] p-2 '>
                <div className='h-[60px] overflow-y-scroll'>{post.prompt}</div>
                <div className=' text-violet-700'>{post.tag}</div>
            </div>
            {
                session?.user.id === post.padmin._id && modify && (
                    <div className='flex gap-5 justify-center font-medium'>
                        <button onClick={EditPost} className='text-green-700'>
                            Edit
                        </button>
                        <button onClick={DeletePost} className='text-red-700'>Delete</button>
                    </div>
                )
            }
            {
                session?.user && (
                    <div className='transition-[1s]'>
                        <Image
                            src={Likes.isLiked ? Like : unLike}
                            height={25}
                            width={25}
                            alt='Like'
                            className='absolute bottom-3 right-7'
                            onClick={handleLike}
                        />
                    </div>
                )
            }

        </div>

    )
}

export default Card
