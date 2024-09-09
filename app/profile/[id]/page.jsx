"use client"

import React, { useState, useEffect, Suspense } from 'react'
import Profile from '@components/Profile'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

const ProfileComp = ({ params }) => {

  const searchParams = useSearchParams();
  const name = searchParams.get("name")
  const [myPost, setMyPosts] = useState([]);
  const [pending, setpending] = useState()

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`, { cache: 'force-cache' });
      const data = await response.json();
    
      if (response.ok){
        setMyPosts(data);
      }
    };

    if (params?.id) fetchPosts();
  }, [params?.id]);

  return (
    <div className='m-4 ml-5 mt-9'>
      <div className='gradient-text '>
        {name}
      </div>
      <Profile myPost={myPost} username={name} />
    </div>
  )
}



const UserProfile = ({ params }) => {
  return (

    <Suspense>

      <ProfileComp params={params} />

    </Suspense>
  )
}

export default UserProfile
