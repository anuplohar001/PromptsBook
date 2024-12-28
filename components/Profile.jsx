"use client"

import React from 'react'
import Card from './Card'
import UpdateProf from './UpdateProf'
import { useSession } from 'next-auth/react'

const Profile = ({ myPost }) => {

    console.log(myPost)
    const { data: session } = useSession()

    return (
        <div className='flex h-[70vh]  '>
            <div>
                <div className='gradient-text '>
                    {
                        session?.user.id === myPost[0].padmin._id ? (<div>My Profile</div>) : (<div>{myPost[0].padmin.username}</div>)
                    }
                </div>
                {
                    <div className='mt-3 flex flex-wrap gap-4 w-[46vw] overflow-y-scroll h-[70vh]'>
                        {
                            myPost && myPost.map && myPost.map((item) => (
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

                            ))
                        }
                    </div>
                }
            </div>
            <div className=''>
                {
                    session?.user.id === myPost[0].padmin._id && (<UpdateProf />)
                }
            </div>
        </div >
    )
}

export default Profile
