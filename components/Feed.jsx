"use client"

import React, { useState, useEffect } from "react"
import Card from "./Card"
import { useSession } from "next-auth/react"
const Feed = () => {

    const [posts, setPosts] = useState([])
    const {data: session} = useSession();

    useEffect(() => {

        const getPosts = async () => {
            const data = await fetch('api/prompt/old')
            const post = await data.json();
            setPosts(post)
        }

        getPosts()

    }, [])

    

    return (
        <>
            <input className="shadow-2xl rounded-sm ml-[15vw] mt-5 p-5 w-[59vw] h-8" type="text" placeholder="Search the Prompt"/>
            <div className="flex flex-wrap gap-10 mt-10 ml-[15vw]">
                {
                    posts.map((post) => (
                        <Card key={post._id} post={post} modify={false} />
                    ))
                }
            </div>
        </>
    )
}

export default Feed