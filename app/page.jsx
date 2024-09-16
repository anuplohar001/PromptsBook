import React, { Suspense } from 'react'
import Feed from "@components/Feed"
import Errors from '@components/Errors'
import { checkEnvironment } from '@lib/actions'
import Loader from '@components/Loader'

const Home = async () => {
  
  const response = await fetch(checkEnvironment().concat("/api/feed"), {next: { revalidate: 2 }})
  const posts = await response.json()
  // const responses = await fetch(checkEnvironment().concat("/api/story"), { next: { revalidate: 2 }, method:"GET" })
  // const story = await responses.json()

  
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
        <Feed posts={posts}/>     
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


