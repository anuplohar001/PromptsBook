"use client"

import React, {useState, useEffect} from 'react'
import Profile from '@components/Profile'
import { useSearchParams } from 'next/navigation'

const UserProfile = ({params}) => {
  
    const searchParams = useSearchParams();
    const name = searchParams.get("name")
    const [myPost, setMyPosts] = useState([]);

    useEffect(() => {

        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();
            setMyPosts(data);
        };

        if (params?.id) fetchPosts();
    }, [params?.id]);

  return (
    <div>
        <Profile myPost={myPost} username={name}/>
    </div>
  )
}

export default UserProfile
