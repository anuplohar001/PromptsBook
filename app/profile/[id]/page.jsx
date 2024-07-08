"use client"

import React, { useState, useEffect, Suspense } from 'react'
import Profile from '@components/Profile'
import { useSearchParams } from 'next/navigation'
import Loader from '@components/Loader'
import load from '@public/assets/loader.svg'
import Image from 'next/image'

const ProfileComp = ({ params }) => {

  const searchParams = useSearchParams();
  const name = searchParams.get("name")
  const [myPost, setMyPosts] = useState([]);
  const [pending, setpending] = useState(false)

  useEffect(() => {

    const fetchPosts = async () => {
      setpending(true)
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setMyPosts(data);
      if (response.ok)
        setpending(false)
    };

    if (params?.id) fetchPosts();
  }, [params?.id]);

  return (
    <div>
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
