"use client"

import React from 'react'
import Card from './Card'

const Profile = ({myPost, username}) => {
    // console.log(myPost)
  return (
      <div className='mt-8'>
          <h1 className='mx-20 gradient-text'>
              {username}
          </h1>
          <div className='m-10 flex gap-10'>
              {
                  myPost.map((item) => (
                      <Card key={item._id} post={item} modify={true} />
                  ))
              }
          </div>
      </div>
  )
}

export default Profile
