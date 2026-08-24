import Errors from '@components/Errors'
import Profile from '@components/Profile'
import { serverUrl } from '@lib/actions'
import React from 'react'
export const dynamic = "force-dynamic";
export const revalidate = 0;
const Page = async ({ params }) => {
  const response = await fetch(serverUrl().concat(`/profile?id=${params.id}`), {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
    cache: "no-store",
  })
  const posts = await response.json()
  
  if (!response.ok) {
    return <Errors />;
  }

  return (
    <div className='m-6 ml-8'>
      <Profile myPost={posts.prompts}/>
    </div>
  )
}

export default Page
