"use client"

import React, { useState, useEffect } from "react"
import Card from "./Card"

const Feed = () => {
    
    const [posts, setPosts] = useState([])

    useEffect(()=>{

        const getPosts = async ()=>{
            const data = await fetch('api/prompt/old')
            const post = await data.json();
            setPosts(post)
        }

        getPosts()

    }, [])

    return (
        <div className="flex flex-wrap gap-10 m-14">
            {
                posts.map((post) => (
                    <Card key={post._id} post={post} modify={false} />
                ))
            }
        </div>
    )
}

export default Feed