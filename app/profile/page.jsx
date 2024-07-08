"use client"

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Profile from '@components/Profile'
import Loader from '@components/Loader'

const page = () => {

  const {data: session} = useSession();
  const [myPost, setMyPosts] = useState([]);
  const [pending, setpending] = useState(false)
  
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
      <Profile myPost={myPost} username="MY PROFILE" />
    </div>
  )
}

export default page
