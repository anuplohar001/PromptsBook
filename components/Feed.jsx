"use client"
import React, { useState, useEffect } from "react"
import Clock from 'react-live-clock';
import Image from "next/image"
import Card from "./Card"
import Loader from "./Loader"
import { Story } from "./Story"
import { useSession } from "next-auth/react"
const Feed = ({ posts, story }) => {

    const postStory = async () => {
        const responses = await fetch("/api/story", { method: "POST" })
        if (responses.ok)
            alert("Story Posted")
    }

    const [searchText, setSearchtext] = useState("")
    const [searchPost, setsearchdPost] = useState([])
    const [pending, setPending] = useState(false)

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
                    {/* <button onClick={postStory}>Add Story</button> */}
                    {/* <div className="flex gap-5 w-[80vw] overflow-scroll">
                        {
                            story && story.map && story.map((item)=>{
                                <Story/>
                            })
                        }
                    </div> */}
                    <div className="flex bg-white mt-1 w-max shadow-lg rounded-lg">
                        <Image src={'/assets/search.svg'}
                            height={20}
                            width={20}
                            alt="search"
                            className="mx-2 w-7 h-7" />

                        <input className="relative  rounded-sm w-[60vw] h-8 p-2"
                            type="text"
                            value={searchText}
                            onChange={getSearched}
                            placeholder="Search the Prompt" />
                    </div>

                    <div className="p-2 overflow-scroll h-[63vh] mt-4">
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
                                    posts && posts.map && posts.map((item) => (

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

                    </div>

                </div >)
            }


        </div>
    )
};

export default Feed