import Errors from '@components/Errors'
import Profile from '@components/Profile'
import React from 'react'

const Page = async ({ params }) => {
  const response = await fetch(`https://backend-woad-nu.vercel.app/profile?id=${params.id}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })
  const posts = await response.json()

  if(!response.ok)
    <Errors/>

  return (
    <Profile myPost={posts.prompts}/>
  )
}

export default Page
