"use client"

import React, {useState} from 'react'
import {useRouter} from 'next/navigation'
import { useSession } from 'next-auth/react'
import Forms from '@components/Forms'
import { revalidateTag } from 'next/cache'
import { serverUrl } from '@lib/actions'
import { toast } from 'sonner'

const Create = () => {

  const [post, setPost] = useState({ prompt: "", tag: "" })
  const router = useRouter();
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      
      const response = await fetch( serverUrl().concat('/create'), {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          padmin: session?.user.id,
        })
      })
      if (response.ok) {
        toast.success('Post Created Successfully')
        router.refresh()
        router.push('/')
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

  }

  return (
    <div>
      <Forms type={loading ? 'Creating...' : 'Create'} handleClick={handleClick} post={post} setPost={setPost} />      
    </div>
  )
}

export default Create
