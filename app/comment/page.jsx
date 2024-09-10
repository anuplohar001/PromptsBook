"use client"
import React, { useEffect, useState, Suspense } from 'react'
import Comment from '@components/Comment'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { revalidateTag } from 'next/cache'

function Comments() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [details, setdetails] = useState({})
  const [user, setuser] = useState({})
  const [pending, setPending] = useState(false)

  const getCard = async () => {
    try {
      setPending(true)
      const response = await fetch(`/api/prompt/${id}/`, { method: "GET",  next: { tags: ['comment'] }, cache: 'force-cache'  })
      if(response.ok){
        const data = await response.json()
        setdetails(data)
        setuser(data.padmin)
        setPending(false)
        revalidateTag('comment')
      }
    }
    catch {
      console.log("Error")
    }
  }

  useEffect(() => {
    getCard()
  }, [id])


  return (
    
      <div>

        {
          pending ? (<Image src={'/assets/loader.svg'} height={20} width={20} alt='loading' className='ml-[45vw] mt-[35vh] w-[8vw] h-[8vw]'/>) : (<Comment postid={id} userid={details.padmin} prompt={details.prompt} tag={details.tag} username={user.username} img={user.image} email={user.email} />)
        }
      </div>
  )
}

const page = () => {
  
  return (
    <Suspense>
      <Comments/>
    </Suspense>
  )
  
}

export default page
