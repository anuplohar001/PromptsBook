"use client"
import React, { useState } from "react"
import Image from "next/image"
import Card from "./Card"
import { Story } from "./Story";
import { useSession } from "next-auth/react";
import Share from "./Share";

const Feed = ({ posts, storyAdmin }) => {

    const { data: session } = useSession()
    const [searchText, setSearchtext] = useState("")
    const [searchPost, setsearchdPost] = useState([])
    const [share, setShare] = useState(false)
    const [items, setItems] = useState(null)

    function handleshare (item) {
        setItems(item)
        if(!share)
            setShare(true)
        else
            setShare(false)
    }

    const filterPost = (text) => {
        const regx = new RegExp(text, "i");
        return posts.filter((item) => regx.test(item.prompt) || regx.test(item.tag) || regx.test(item.padmin.username))
    }


    const getSearched = (e) => {
        const a = e.target.innerText
        const b = e.target.value
        if(a){
            setSearchtext(a)
            setTimeout(() => {
                const post = filterPost(a)
                setsearchdPost(post)
            }, 500);
        }
        else{
            setSearchtext(b)
            setTimeout(() => {
                const post = filterPost(b)
                setsearchdPost(post)
            }, 500);
        }
        
    }



    return (
        <div className="flex items-center flex-col relative">
            {
                share && (<Share handleshare={handleshare} item={items}/>)
            }
            <div className="flex gap-3 w-[80vw] h-24 m-2 overflow-x-scroll">
                {session?.user.id && <Story img={session?.user.image} admin={session?.user.id} />}
                {
                    storyAdmin.map((admin) => (
                        admin[0] != session?.user.id && (<Story key={admin[0]} admin={admin[0]} img={admin[1]} />)
                    ))
                }
            </div>
            {
                !session && (<div className="text-white font-bold">
                    Email : <u>anuplohar001@gmail.com</u> Password : <u>pass@123</u>
                </div>)
            }
            
            <div className="flex allbg w-max shadow-lg rounded-lg">
                 
                <Image src={'/assets/search.svg'}
                    height={20}
                    width={20}
                    alt="search"
                    className="mx-2 w-7 h-7" />

                <input className="relative text-white rounded-sm w-[60vw] h-8 p-2 allbg"
                    type="text"
                    value={searchText}
                    onChange={getSearched}
                    placeholder="Search the Prompt" />
            </div>

            <div className="p-2 overflow-scroll h-[71vh] mt-1">
                {
                    searchText ? (<div className="flex flex-wrap w-[72vw] gap-7" >
                        {
                            searchPost.map((item) => (

                                <Card
                                    key={item._id}
                                    prompt={item.prompt}
                                    tag={item.tag}
                                    postid={item._id}
                                    username={item.padmin.username}
                                    userid={item.padmin._id}
                                    img={item.padmin.image}
                                    email={item.padmin.email} 
                                    handleshare={()=>handleshare(item)}
                                    />

                            ))
                        }
                    </div>) : (<div className="flex flex-wrap justify-center items-center gap-7">
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
                                    email={item.padmin.email}
                                    getSearched={getSearched} 
                                    handleshare={() => handleshare(item)}
                                    />
                            ))
                        }
                    </div>)
                }

            </div>

        </div >


    )
};

export default Feed