"use client"
import React, { useState } from "react"
import Image from "next/image"
import Card from "./Card"
import Loader from "./Loader"
import { Story } from "./Story"


export const checkEnvironment = () => {
    let base_url =
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "http://prompts-book.vercel.app"; // https://v2ds.netlify.app

    return base_url;
};

const Feed = ({posts}) => {

    // console.log(posts)
    const [searchText, setSearchtext] = useState("")
    const [searchPost, setsearchdPost] = useState([])
    const [pending, setPending] = useState(false)
    
    // const [posts, setPosts] = useState([])
    // const getPosts = async () => {
    //     setPending(true)
    //     const response = await fetch('/api/feed', {})
    //     console.log("fetching")
    //     const data = await response.json();
    //     if (response.ok) {
    //         setPosts(data)
    //         setPending(false)
    //     }
    // }

    // useEffect(() => {
    //     getPosts()
    // }, [])


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
            
            {
                 (<div className="flex  items-center flex-col relative ">

                    <div className="flex gap-5 mt-3 h-[14vh] w-[80vw] overflow-scroll">
                        {
                            posts && posts.map && posts.map((item) => (
                                <Story
                                    key={item._id}
                                    img={item.padmin.image} />
                            ))
                        }
                    </div>

                    <div className="flex bg-white mt-1 w-max shadow-lg rounded-lg">
                        <Image src={'/assets/search.svg'}
                            height={20}
                            width={20}
                            alt="search"
                            className="mx-2 w-auto" />

                        <input className="relative  rounded-sm w-[60vw] h-8 p-2"
                            type="text"
                            value={searchText}
                            onChange={getSearched}
                            placeholder="Search the Prompt" />
                    </div>

                    <div className="p-2 overflow-scroll h-[63vh] mt-4">
                        {
                            pending ? (<Loader />) : (<div>
                                {
                                    searchText ? (<div className="flex flex-wrap w-[72vw] gap-10" >
                                        {
                                            searchPost.map((item) => (

                                                <Card
                                                    key={item._id}
                                                    prompt={item.prompt}
                                                    tag={item.tag}
                                                    postid={item._id}
                                                    username={item.padmin.username}
                                                    userid={item.padmin.id}
                                                    img={item.padmin.image}
                                                    email={item.padmin.email} />

                                            ))
                                        }
                                    </div>) : (<div className="flex flex-wrap justify-center items-center gap-10">
                                        {
                                            posts.map((item) => (

                                                <Card
                                                    key={item._id}
                                                    prompt={item.prompt}
                                                    tag={item.tag}
                                                    postid={item._id}
                                                    username={item.padmin.username}
                                                    userid={item.padmin._id}
                                                    img={item.padmin.image}
                                                    email={item.padmin.email} />
                                            ))
                                        }
                                    </div>)
                                }
                            </div >)
                        }
                    </div>

                </div >)
            }


        </div>
    )
};

export default Feed