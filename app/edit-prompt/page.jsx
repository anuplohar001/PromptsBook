"use client"

import { Suspense } from 'react'
import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Forms from '@components/Forms'
import Loader from '@components/Loader'


const Editcomp = () => {

    const [post, setPost] = useState({ prompt: "", tag: "" })
    const [pending, setpending] = useState(false)
    const searchParams = useSearchParams();
    const router = useRouter()
    const id = searchParams.get('id')

    useEffect(() => {

        const getPosts = async () => {
            setpending(true)
            const response = await fetch(`api/prompt/${id}`, {
                method: "GET"
            })
            const data = await response.json()
            setPost({ prompt: data.prompt, tag: data.tag })
            setpending(false)
        }

        if (id) getPosts()

    }, [])

    const handleClick = async (e) => {

        e.preventDefault();
        try {

            const response = await fetch(`api/prompt/${id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if (response.ok) {
                alert("Post Edited Successfully")
                router.back()
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {
                pending ? (<Loader />) : (<Forms type='Edit' post={post} setPost={setPost} handleClick={handleClick} />)
            }
        </div>
    )
}


const Edit = () => {
    return (

        <Suspense>
            <Editcomp />
        </Suspense>
    )
}

export default Edit
