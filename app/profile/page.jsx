"use client"

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Profile from '@components/Profile'
import UpdateProf from '@components/UpdateProf'

const page = () => {

  const { data: session } = useSession();
  const [myPost, setMyPosts] = useState([]);
  const [likedPost, setLikedPosts] = useState([]);
  const [pending, setpending] = useState()

  const handlePosts = async (e) => {

    if (e.target.id === "Liked" && session?.user.id) {
      const response = await fetch(`api/users/${session?.user.id}/liked`, { method: 'GET' })
      const data = await response.json()
      setLikedPosts(data)
    }
    else {
      setLikedPosts([])
    }

  }

  useEffect(() => {
    const fetchPosts = async () => {
      setpending(true)
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setMyPosts(data);
      if (response.ok)
        setpending(false)
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);


  return (
    <div>
      {
        session?.user.id && (<form className='gradient-text flex gap-5 ml-5 mt-3'>
          <div>
            <input type="radio" id='My-Posts' name='posts' onChange={handlePosts} />
            <label htmlFor="My-Posts">My Posts</label>
          </div>
          <div>
            <input type="radio" id='Liked' name='posts' onChange={handlePosts} />
            <label htmlFor="Liked">Liked Posts</label>
          </div>
          <div className='ml-[29vw]'>
            Update Profile
          </div>
        </form>)
      }
      <div className='flex'>
        {
          likedPost.length === 0 ? (<Profile myPost={myPost} username="My Posts" updatePr={true} />) : (<Profile myPost={likedPost} username="Liked Posts" updatePr={true} />)
        }
        <UpdateProf />
      </div>
    </div>
  )
}

export default page
