"use client"

import React from 'react'
import Card from './Card'
import Loader from './Loader'
import UpdateProf from './UpdateProf'
import { useSession } from 'next-auth/react'

const Profile = ({ myPost, username, updatePr }) => {
      
    return (
        <div className='flex md:flex-row flex-col h-[70vh] w-[50vw] overflow-y-scroll'>
            {
                myPost.length === 0 ? (<div className='m-[10vw]'> <Loader/> </div>) : (<div className='mt-7 ml-2 w-[50vw ' >                    

                    <div className='flex flex-wrap gap-4'>
                        {
                            username==="Liked Posts" ? (myPost.map((item) => (
                                <Card
                                    key={item._id}
                                    prompt={item.postid.prompt}
                                    modify={true}
                                    tag={item.postid.tag}
                                    postid={item.postid._id}
                                    username={item.postid.padmin.username}
                                    userid={item.postid.padmin._id}
                                    img={item.postid.padmin.image}
                                    email={item.postid.padmin.email} />
                                

                            ))) : ((myPost.map((item) => (
                                // console.log(item)

                                <Card
                                    key={item._id}
                                    post={item}
                                    modify={true}
                                    prompt={item.prompt}
                                    tag={item.tag}
                                    postid={item._id}
                                    username={item.padmin.username}
                                    userid={item.padmin._id}
                                    img={item.padmin.image}
                                    email={item.padmin.email} />

                            ))))
                        }
                    </div> </div>)
            }
        </div >
    )
}

export default Profile
