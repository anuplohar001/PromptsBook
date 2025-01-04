"use client"

import React from 'react'
import Card from './Card'
import UpdateProf from './UpdateProf'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
const Profile = ({ myPost }) => {
    const { data: session } = useSession()

    return (
        <div className='h-[70vh]'>
            <div className='bg-gradient-to-r from-sky-500 to-indigo-500 gradient-text text-center'>
                {
                    session?.user.id === myPost[0].padmin._id ? (<div className='justify-center flex gap-3'>
                        <Image
                            src={myPost[0].padmin.image}
                            alt='image'
                            height={30}
                            width={30}
                            className='h-20 w-20 rounded-full'
                        />
                        My Profile
                        </div>) : (<div className='justify-center flex gap-3'>
                            <Image
                                src={myPost[0].padmin.image}
                                alt='image'
                                height={30}
                                width={30}
                                className='h-20 w-20 rounded-full'
                            />
                            <span>{myPost[0].padmin.username}</span>                            
                            </div>)
                }
            </div>
            <div className='flex'>

                <div>
                    {
                        <div className={`mt-3 flex flex-wrap gap-4 overflow-y-scroll h-[70vh] ${session?.user.id === myPost[0].padmin._id ? "w-[53vw]" : "w-[80vw]"} `}>
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
                <div>
                    {
                        session?.user.id === myPost[0].padmin._id && (<UpdateProf />)
                    }
                </div>
            </div>
        </div >
    )
}

export default Profile
