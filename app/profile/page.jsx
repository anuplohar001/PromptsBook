"use client"
import Card from '@components/Card'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

const page = () => {

  const {data : session } = useSession()
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
      <h1 className='mx-20 gradient-text'>
        My Profile
      </h1>
      <div className='flex gap-4 justify-center'>
        {
          myPost.map((item) => (
            <Card key={item._id} post={item} modify={true}/>
          ))
        }
      </div>
    </div>
  )
}

export default page
