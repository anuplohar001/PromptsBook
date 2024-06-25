"use client"

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import Profile from '@components/Profile'

const page = () => {

  const {data: session} = useSession();
  const searchParams = useSearchParams();
  const name = searchParams.get("name")
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
