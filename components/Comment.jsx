"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Card from './Card'
import CommCard from './CommCard'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const Comment = ({ prompt, tag, img, username, email, postid, userid }) => {
  
  const router = useRouter()
  const { data: session } = useSession()
  const [comments, setcomments] = useState({ comment: "", postid: postid, padmin: session?.user.id })
  const [oldc, setoldc] = useState([])

  const oldcomments = async () => {
    try {
      const response = await fetch(`/api/comment/${postid}`)
      const data = await response.json()
      setoldc(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    oldcomments()
  }, [postid])


  const handlekeypress = async (e) => {
    const response = await fetch('/api/comment', {
      method: "POST",
      body: JSON.stringify({
        comment: comments.comment,
        padmin: session?.user.id,
        postid: postid
      })
    })
    oldcomments()
    setcomments({ comment: "" })
  }

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 w-[100vw] z-10 h-[100vh] bg-black/70'>

      <Image
        height={25}
        width={25}
        src={'assets/close.svg'}
        alt='close'
        className='cursor-pointer m-5 ml-[90vw] gradient rounded-md'
        onClick={() => router.back()} />

      <div className='ml-[10vw] mt-8 flex'>

        <Card
          prompt={prompt}
          tag={tag}
          postid={postid}
          username={username}
          userid={userid}
          img={img}
          email={email} />

        <div className='gradient h-[50vh] w-[50vw] ml-6 rounded-xl '>

          <div className='h-[48vh] overflow-scroll'>

            {
              oldc.length ? (oldc.map((item) => (

                <CommCard key={item._id}
                  comentid={item._id}
                  comment={item.comment}
                  img={item.padmin.image}
                  username={item.padmin.username}
                  userid={item.padmin._id}
                  oldcomments={oldcomments} />

              ))) : (<div className=' m-[20vh]'> Be the first to comment on this post ... </div>)
            }
          </div>


          <div className='flex mt-5 ml-0 bg-white h-10 rounded-lg border w-[50vw]'>

            <input type="text" placeholder='Type here for comment' className='text-sm rounded-lg w-[50vw] p-2' value={comments.comment} onChange={(e) => setcomments({ ...comments, comment: e.target.value })}
              onKeyUp={(e) => {
                if (e.key === "Enter")
                  handlekeypress()
              }} />
            {
              comments.comment && <Image src={'/assets/addcomment.svg'} height={22} width={22} alt='add+' onClick={handlekeypress} className='cursor-pointer w-[3vw] h-[3vw] p-1' />
            }

          </div>
        </div>

      </div>
    </div>
  )
}

export default Comment
