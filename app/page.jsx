import React, { Suspense } from 'react'
const Feed = React.lazy(() => import("@components/Feed"))



const Home = () => {



  return (
    <div className='overflow-y-scroll h-[90vh] p-0'>

      <section className='w-full mt- flex justify-center items-center flex-col'>
        <div className='text-[30px] font-black text-center shadows'>
          <h1 className='leading-[1.10]'>Discover & Share AI-Powered Prompts</h1>
        </div>
        <div className='text-[13px] text-center w-[80vw] flex flex-col'>
          <b>Use following credentials for LogIn and access the rest functions</b>
          <div>Email : <b>anuplohar001@gmail.com</b></div>
          <div>Password : <b>anup@220803</b></div>
         
        </div>
      </section>
      
      <Suspense fallback={<p>Loading...</p>}>
        <Feed />
      </Suspense>
    </div>
  )
}

export default Home
