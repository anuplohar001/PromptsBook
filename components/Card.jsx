"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Card = ({modify, prompt, tag, img, username, email, postid, userid }) => {

    const router = useRouter();
    const { data: session } = useSession()
    const [Likes, setLikes] = useState({ isLiked: false })
    const [copy, setcopy] = useState(false)

    const getLikes = async () => {
        try {
            const response = await fetch( `/api/prompt/${postid}/${session?.user.id}`, {
                method: "GET"
            })
            const data = await response.json()
            setLikes({ isLiked: data.isLiked })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {        
        if (session?.user.id) getLikes()
    }, [session?.user.id])


    const userProfile = () => {
        
        if (userid === session?.user.id) {
            router.push(`/profile`)
        }
        else{
            console.log(userid)
            router.push(`/profile/${userid}?name=${username}`)
        }
    }

    const DeletePost = async () => {
        if (confirm("Are you sure you want to delete this post")) {
            const response = await fetch(`api/prompt/${postid}`, {
                method: "DELETE"
            })
            if (response.ok) {
                alert("Post Deleted Successfully")
                router.push("/")
            }
        }
    }

    const EditPost = () => {
        router.push(`/edit-prompt?id=${postid}`)
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
            const response = await fetch(`api/prompt/${postid}/${session?.user.id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    isLiked: flag
                })
            })

        } catch (error) {
            console.log("Errr", error)
        }

    }

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt);
        setcopy(true)
        setTimeout(() => {
            setcopy(false)
        }, 3000);
    }

    return (

        <div className='prompt_card' onDoubleClick={handleLike}>

            <div className='ml-1 flex gap-4 ' >
                <div className='flex gap-3 hover:cursor-pointer' onClick={userProfile}>


                    <Image
                        src={img ? (img) : '/assets/user.jpg'}
                        alt='Profile Img'
                        width={30}
                        height={30}
                        className='rounded-full'

                    />
                    
                    <div className='text-sm'>
                        <div className='font-bold'>{username}</div>
                        <div>{email}</div>
                    </div>
                </div>
                <div onClick={handleCopy}>
                    <Image src={copy ? '/assets/tick.svg' : '/assets/copy.svg'}
                        height={18}
                        width={18}
                        alt='copy'
                    />
                </div>
            </div>
            <div className='text-sm mt-3 h-[130px] p-2 '>
                <div className='h-[60px] overflow-y-scroll'>{prompt}</div>
                <div className=' text-violet-700'>{tag}</div>
            </div>
            {
                session?.user.id === userid && modify && (
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
                            src={Likes.isLiked ? '/assets/like.svg' : '/assets/unlike.svg'}
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
