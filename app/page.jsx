import React from 'react'
import Feed from '@components/Feed'

const Home = () => {
  return (
    <div>
      <section className='w-full mt-5 flex justify-center items-center flex-col'>
        <div className='text-[45px] font-black text-center'>
          <h1>Discover & Share
            <div className='gr'>
              AI-Powered Prompts
            </div> </h1>
        </div>
        <div className=' text-center w-[80vw]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, necessitatibus. Ab temporibus accusamus iusto debitis tempore consequatur. Voluptates facilis deleniti corrupti eveniet non eum. Aut ex non ut,</div>
      </section>
      <Feed />
    </div>
  )
}

export default Home
