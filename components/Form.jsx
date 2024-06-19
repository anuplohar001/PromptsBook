"use client"

import React, {useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Form = ({ type}) => {
    const router = useRouter();
    const { data: session } = useSession()
    const [post, setPost] = useState({prompt:"", tag:""})


    const submitPost = async (e) => {
        e.preventDefault();
        try {

            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    id: session?.user.id,
                })
            })
            console.log(response)
            if (response.ok) {
                alert("Post created Successfully")
                router.push('/')
            }

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='ml-20'>
            <h1 className='gradient-text'>
                {type} post
            </h1>
            <form action="" className='flex flex-col'>
                <label htmlFor="" className='flex flex-col'>
                    <span className='my-5 font-semibold'>
                        {type} Post
                    </span>
                    <textarea name="prompt"
                        placeholder='Create your Prompt'
                        id="" className='mb-10 h-44 w-[50vw] p-2 rounded-md shadow-xl'
                        onChange={(e) => setPost({ ...post, prompt: (e.target.value) })}
                    ></textarea>
                </label>
                <label htmlFor="" className='flex flex-col'>
                    <span className='mb-4 font-semibold'>
                        Related To (#webdevelopment, #idea, #coding)
                    </span>
                    <input className='rounded-md p-2 w-[50vw] shadow-xl'
                        placeholder='#tag'
                        type="text"
                        onChange={(e) => setPost({ ...post, tag: e.target.value })}
                    />
                </label>

                <button onClick={submitPost} 
                    className="shadow-xl my-4 w-20 p-2 bg-orange-400 text-white rounded-full text-sm" >{type}...</button>
            </form>
        </div>
    )
}

export default Form
