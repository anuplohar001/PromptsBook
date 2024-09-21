import Errors from '@components/Errors'
import Profile from '@components/Profile'
import { serverUrl } from '@lib/actions'
import React from 'react'

const Page = async ({ params }) => {
  const response = await fetch(serverUrl().concat(`/profile?id=${params.id}`), {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
    next: { revalidate: 2 }
  })
  const posts = await response.json()

  if(!response.ok)
    <Errors/>

  return (
    <div className='m-6 ml-8'>
      <Profile myPost={posts.prompts}/>
    </div>
  )
}

export default Page
