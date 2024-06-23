"use client"

import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Form from '@components/Form'

const Edit = () => {
    const [post, setPost] = useState({ prompt: "", tag: "" })
    const searchParams = useSearchParams();
    const router = useRouter()
    const id = searchParams.get('id')

    useEffect(() => {

        const getPosts = async () => {
            const response = await fetch(`api/prompt/${id}`, {
                method: "GET"
            })
            const data = await response.json()
            // alert(data.tag)

            setPost({ prompt: data.prompt, tag: data.tag })
        }

        if (id) getPosts()

    }, [id])

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
                router.push("/profile")
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Form type='Edit' post={post} setPost={setPost} handleClick={handleClick} />
        </div>
    )
}

export default Edit
