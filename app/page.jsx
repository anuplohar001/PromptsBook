import React, { Suspense } from 'react'
import { revalidatePath, revalidateTag } from 'next/cache'
const Feed = React.lazy(() => import("@components/Feed"))


export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "http://prompts-book.vercel.app"; // https://v2ds.netlify.app

  return base_url;
};

export default async function Page() {

  let data = await fetch(checkEnvironment().concat("/api/feed"))
  // let data = await fetch("http://localhost:3000/api/feed", { cache: 'no-store' })
  let posts = []
  if(data.ok){
    posts = await data.json()
  }

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

      <Suspense>
        <Feed posts={posts}/>
      </Suspense>
    </div>
  )
}

