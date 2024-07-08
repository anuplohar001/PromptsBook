"use client"

import React from 'react'
import Card from './Card'
import Loader from './Loader'

const Profile = ({ myPost, username }) => {
    return (

        <div>
            {
                myPost.length === 0 ? (<div className='m-[10vw]'> <Loader /> </div>) : (<div> <h1 className='mx-20 gradient-text'>
                    {username}
                </h1>
                    <div className='m-10 flex gap-10'>
                        {
                            myPost.map((item) => (
                                <Card key={item._id} post={item} modify={true} />
                            ))
                        }
                    </div> </div>)
            }

        </div >
    )
}

export default Profile
