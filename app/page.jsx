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
    <div className='overflow-y-scroll h-[90vh] p-0 mt-2'>
      <section className='w-[80vw] flex justify-center items-center flex-col'>
        <div className='text-[30px] font-black text-center shadows'>
          <h1 className='leading-[1.10]'>Discover & Share AI-Powered Prompts</h1>
        </div>
        <div className='text-[13px] text-center w-[80vw] flex flex-col'>
          <b>Use following credentials for LogIn and access the rest functions</b>
          <div>Email : <b>anuplohar001@gmail.com</b></div>
          <div>Password : <b>anup@220803</b>
          
          </div>
        </div>
      </section>
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


