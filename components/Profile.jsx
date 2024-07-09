"use client"

import React from 'react'
import Card from './Card'
import Loader from './Loader'
import UpdateProf from './UpdateProf'

const Profile = ({ myPost, username }) => {
    return (

        <div className='flex md:flex-row flex-col'>
            {
                myPost.length === 0 ? (<div className='m-[10vw]'> <Loader /> </div>) : (<div className='mt-5 w-[50vw] border-black'> <h1 className='lg:mx-20 mx-3 gradient-text'>
                    {username}
                </h1>
                    <div className='m-5 flex flex-wrap gap-4'>
                        {
                            myPost.map((item) => (
                                <Card key={item._id} post={item} modify={true} />
                            ))
                        }
                    </div> </div>)
            }
            <div>
                {
                    username === "MY PROFILE" && (<UpdateProf/>)
                }
            </div>
        </div >
    )
}

export default Profile
