import React, { Suspense } from 'react'
import Feed from "@components/Feed"
import Errors from '@components/Errors'
import { serverUrl } from '@lib/actions'
import Loader from '@components/Loader'


const Home = async () => {
  
  const response = await fetch(serverUrl().concat("/feed"),{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    next: { revalidate: 2 }
  })
  const posts = await response.json()  

  const storyResponse = await fetch(serverUrl().concat(`/oldStory`), {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    next: { revalidate: 2 }
  })
  const oldStory = await storyResponse.json()
  const idd = new Map()
  
  oldStory.map((item) => (
    idd.set(item.userid._id, item.userid.image)
  ))
  const users = Array.from(idd)
  
  
  if(!response.ok){    
    return (<Errors/>)
  }
  
  return (
    <div className='overflow-y-scroll p-0 mt-2 '>
        <Feed posts={posts.prompts} storyAdmin={users} story={oldStory}/>     
    </div>
  )
}

const page = ({params}) => {
  return (
    <Suspense fallback={<Loader/>}>
      <Home/>
    </Suspense>
  )
}

export default page


