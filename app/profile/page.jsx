"use client"

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Profile from '@components/Profile'

const page = () => {

  const {data: session} = useSession();
  const [myPost, setMyPosts] = useState([]);

  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setMyPosts(data);
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
