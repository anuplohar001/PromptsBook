"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import search from '@public/assets/search.svg'
import Card from "./Card"
const Feed = () => {

    const [posts, setPosts] = useState([])
    const [searchText, setSearchtext] = useState("")
    const [searchPost, setsearchdPost] = useState([])

    const getPosts = async () => {

        const data = await fetch('api/feed')
        const post = await data.json();
        setPosts(post)
    }

    useEffect(() => {

        getPosts()

    }, [])

    const filterPost = (text) => {
        const regx = new RegExp(text, "i");
        return posts.filter((item) => regx.test(item.prompt) || regx.test(item.tag) || regx.test(item.padmin.username))
    }


    const getSearched = (e) => {
        setSearchtext(e.target.value)
        setTimeout(() => {
            const post = filterPost(e.target.value)
            setsearchdPost(post)
        }, 500);
    }


    return (
        <div>
            <button onClick={getPosts}>Refresh</button>
            <div className="flex bg-white mt-3 ml-[20vw] w-max shadow-lg rounded-lg">

                <Image src={search}
                    height={20}
                    width={20}
                    className="mx-2" />

                <input className="relative  rounded-sm w-[60vw] h-8 p-2"
                    type="text"
                    value={searchText}
                    onChange={getSearched}
                    placeholder="Search the Prompt" />
            </div>

            {
                searchText ? (<div className="flex flex-wrap gap-10 mt-10 ml-[15vw]">
                    {
                        searchPost.map((post) => <Card key={post._id} post={post} modify={false} />)
                    }
                </div>) : (<div className="flex flex-wrap gap-10 mt-10 ml-[15vw]">
                    {
                        posts.map((post) => <Card key={post._id} post={post} modify={false} />)
                    }
                </div>)
            }


        </div>
    )
}

export default Feed