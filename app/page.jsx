
import Feed from '@components/Feed'
import { Suspense } from 'react'

const Home = () => {
  return (
    <div className='overflow-y-scroll h-[80vh]'>
      
      <section className='w-full mt- flex justify-center items-center flex-col'>
        <div className='text-[40px]  font-black text-center'>
          <h1 className='leading-[1.10]'>Discover & Share
            <br />
            <span className='gr'>
              AI-Powered Prompts
            </span> </h1>
        </div>
        <div className=' text-center w-[80vw] flex flex-col'>
          <b>Use following credentials for LogIn and access the rest functions</b>
          <div>Email : <b>anuplohar001@gmail.com</b></div>
          <div>Password : <b>anup@220803</b></div>
          </div>
      </section>
      <Suspense>
        <Feed />
      </Suspense>
    </div>
  )
}

export default Home
