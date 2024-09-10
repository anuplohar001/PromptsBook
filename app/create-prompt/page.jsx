"use client"
import { revalidatePath, revalidateTag } from 'next/cache'
import React, {useState} from 'react'
import {useRouter} from 'next/navigation'
import { useSession } from 'next-auth/react'
import Form from '@components/Form'
import { revalidateFeed } from '@lib/actions';

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
      console.log(response)
      if (response.ok) {
        alert("Post created Successfully")
        revalidateFeed()
        router.back()
      }

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div>
      <Form type='Create' handleClick={handleClick} post={post} setPost={setPost} />
      
    </div>
  )
}

export default Create
