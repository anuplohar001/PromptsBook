"use client"

import React, {useState} from 'react'
import {useRouter} from 'next/navigation'
import { useSession } from 'next-auth/react'
import Forms from '@components/Forms'
import { revalidateTag } from 'next/cache'

const Create = () => {

  const [post, setPost] = useState({ prompt: "", tag: "" })
  const router = useRouter();
  const { data: session } = useSession()

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          padmin: session?.user.id,
        })
      })
      if (response.ok) {
        alert("Post created Successfully")
        router.back()
      }

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div>
      <Forms type='Create' handleClick={handleClick} post={post} setPost={setPost} />      
    </div>
  )
}

export default Create
