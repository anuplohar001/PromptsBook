"use client"

import React from 'react'
import Card from './Card'
import Loader from './Loader'
import UpdateProf from './UpdateProf'

const Profile = ({ myPost, username, likes, updatepr }) => {

    return (
        <div className='flex md:flex-row flex-col h-[70vh] w-[50vw] overflow-y-scroll '>
            {
                <div className='flex flex-wrap gap-4'>
                    {
                        myPost.map((item) => (
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
            <div>
                {
                    updatepr && (<UpdateProf/>)
                }
            </div>
        </div >
    )
}

export default Profile
