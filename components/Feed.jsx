"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import search from '@public/assets/search.svg'
import Card from "./Card"
import Loader from "./Loader"

const Feed = () => {


    const [searchText, setSearchtext] = useState("")
    const [searchPost, setsearchdPost] = useState([])
    const [posts, setPosts] = useState([])
    const [pending, setPending] = useState(true)

    const getPosts = async () => {
        setPending(true)
        const data = await fetch('api/feed')
        const post = await data.json();
        setPosts(post)
        if (data.ok)
            setPending(false)
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
        <div className="flex justify-center items-center flex-col ">
            <div className="flex bg-white mt-3  w-max shadow-lg rounded-lg">

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
            <div className="p-2">
                {
                    pending ? (<Loader />) : (<div>
                        {
                            searchText ? (<div className="flex flex-wrap w-[72vw] gap-10 mt-10" >
                                {
                                    searchPost.map((post) => <Card key={post._id} post={post} modify={false} />)
                                }
                            </div>) : (<div className="flex flex-wrap justify-center items-center gap-10 mt-10 ">
                                {
                                    posts.map((post) => <Card key={post._id} post={post} modify={false} />)
                                }
                            </div>)
                        }
                    </div >)
                }
            </div>

        </div>
    )
}

export default Feed