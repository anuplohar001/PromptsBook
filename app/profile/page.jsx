"use client"

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Profile from '@components/Profile'
import UpdateProf from '@components/UpdateProf'
import Loader from '@components/Loader'

const page = () => {

  const { data: session } = useSession();
  const [myPost, setMyPosts] = useState([]);
  const [likedPost, setLikedPosts] = useState([]);
  const [pending, setpending] = useState(false)
  const [like, setlike] = useState(false)

  const handlePosts = async (e) => {

    if (e.target.id === "Liked" && session?.user.id) {
      setpending(true)
      setlike(true)
      const response = await fetch(`api/users/${session?.user.id}/liked`, { method: 'GET' })
      const data = await response.json()
      setLikedPosts(data)

      setpending(false)
    }
    else {
      setlike(false)
      // setLikedPosts([])
    }

  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`, { cache: 'force-cache' }, { next: { tags: ["posts"] } }
);
      const data = await response.json();
      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);


  return (
    <div>
      {
        session?.user.id && (<form className='gradient-text flex gap-5 ml-5 mt-9'>
          <div >
            <input className='cursor-pointer' type="radio" id='My-Posts' name='posts' onChange={handlePosts} />
            <label className='cursor-pointer' htmlFor="My-Posts">My Posts</label>
          </div>
          <div >
            <input className='cursor-pointer' type="radio" id='Liked' name='posts' onChange={handlePosts} />
            <label className='cursor-pointer' htmlFor="Liked">Liked Posts</label>
          </div>
          <div className='ml-[29vw]'>
            Update Profile
          </div>
        </form>)
      }
      <div className='flex '>
        <div className='w-[50vw]'>
          {
            !like ? (<Profile myPost={myPost} username="My Posts" updatePr={true} />) : (<div>
              {
                pending ? (<div className='m-[13vw]'><Loader /></div>) : (likedPost.length === 0 ? (<div className='m-[15vw] font-bold'>No Liked Post...</div>) : (<Profile myPost={likedPost} username="Liked Posts" updatePr={true} />))
              }
            </div>)
          }
        </div>
        <div >
          <UpdateProf />
        </div>
      </div>
    </div>
  )
}

export default page
