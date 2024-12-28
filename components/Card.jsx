"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { serverUrl } from '@lib/actions'
import Link from 'next/link'
import { toast } from 'sonner'

const Card = ({ 
    modify, 
    prompt, 
    tag, 
    img, 
    username, 
    email, 
    postid, 
    userid,
    getSearched,
    handleshare
}) => {

    const router = useRouter();
    const { data: session } = useSession()
    const [Likes, setLikes] = useState({ isLiked: false })
    const [copy, setcopy] = useState(false)
    const [likesno, setNo] = useState()
    const [pending, setpending] = useState(true)
    
    const getLikes = async () => {

        try {
            setpending(true)
            const response = await fetch( serverUrl().concat(`/likes/${postid}/${session?.user.id}`), {
                method: "GET"
            })
            const data = await response.json()
            setLikes({ isLiked: data.isLike })
        } catch (error) {
            console.log(error)
        }
        getLikesNo()
        setpending(false)
    }

    const getLikesNo = async () => {
        try {
            setpending(true)
            const response = await fetch( serverUrl().concat(`/likes/${postid}`), { method: "GET" })
            const data = await response.json()
            setNo(data.no)
            setpending(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (session?.user.id) {
            getLikes()
            getLikesNo()
        }
    }, [session?.user.id])


    useEffect(() => {
        if (Likes.isLiked)
            setNo(likesno + 1)
        else
            setNo(likesno - 1)
    }, [Likes.isLiked])

    const DeletePost = async () => {

        if (confirm("Are you sure you want to delete this post")) {
            const response = await fetch(serverUrl().concat(`/delete?id=${postid}`), {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            if (response.ok) {
                toast.success("Post Deleted Successfully")
                router.back()
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
            const response = await fetch(serverUrl().concat(`/putLike/${postid}/${session?.user.id}`), {
                method: "PUT",
                body: JSON.stringify({
                    isLiked: flag
                }),
                headers: {
                    "Content-Type": "application/json"
                }
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

        <div className='prompt_card comp-animation' onDoubleClick={handleLike}>
            <div className='ml-1 flex gap-4' >
                <Link href={`/profile/${userid}`} className='flex gap-3 hover:cursor-pointer'>
                    <Image
                        src={img ? (img) : '/assets/user.jpg'}
                        alt='Profile Img'
                        width={30}
                        height={30}
                        className='rounded-full w-[35px] h-[35px]'

                    />

                    <div className='text-sm'>
                        <div className='font-bold'>{username}</div>
                        <div>{email}</div>
                    </div>
                </Link>
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
                <div className=' text-violet-700 cursor-pointer' onClick={getSearched}>{tag}</div>
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
                    <div className='transition-[1s] comp-animation'>
                        {
                            !pending && (<div className='absolute right-9 bottom-1 text-[10px] font-bold'>
                                {likesno ? (likesno) : (0)}
                            </div>)
                        }
                        
                        {
                            pending ? (<div className="absolute bottom-4 right-7 cursor-pointer h-5 w-5 mt-2 mr-2 animate-spin rounded-full border-[2px] border-blue-500 border-t-white">
                            </div>): (<Image
                            src = {Likes.isLiked ? '/assets/like.svg' : '/assets/unlike.svg'}
                        height={25}
                        width={25}
                        alt='Like'
                        className='absolute bottom-4 right-7 cursor-pointer h-5 w-5'
                        onClick={handleLike}
                        />)
                        }
                        

                        <Image
                            src={'/assets/comment.svg'}
                            height={17}
                            width={17}
                            alt='Like'
                            className='absolute bottom-3 cursor-pointer'
                            onClick={() => router.push(`/comment/${postid}`)}
                        />

                        <Image
                            src={'/assets/share.svg'}
                            height={17}
                            width={17}
                            alt='Like'
                            className='absolute bottom-3 left-[42px] cursor-pointer'
                            onClick={handleshare}
                        />
                        
                    </div>
                )
            }

        </div>

    )
}

export default Card
