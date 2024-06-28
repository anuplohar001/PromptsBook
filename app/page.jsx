import React from 'react'
import Feed from '@components/Feed'

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
        <div className=' text-center w-[80vw]'>Engage with a community passionate about artificial intelligence, sparking creativity and innovation through diverse, user-generated content. Join us to contribute and inspire!</div>
      </section>
      <Feed />
    </div>
  )
}

export default Home
