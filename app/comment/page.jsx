"use client"
import React, { useEffect, useState, Suspense } from 'react'

import Comment from '@components/Comment'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Suspense } from 'react'

const page = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [details, setdetails] = useState({})
  const [user, setuser] = useState({})
  const [pending, setPending] = useState(false)

  const getCard = async () => {
    try {
      setPending(true)
      const response = await fetch(`/api/prompt/${id}/`, { method: "GET" })

      const data = await response.json()
      setdetails(data)
      setuser(data.padmin)
      setPending(false)
    }
    catch {
      console.log("Error")
    }
  }

  useEffect(() => {
    getCard()
  }, [id])


  return (
    <Suspense>
      <div>

        {
          pending ? (<Image src={'/assets/loader.svg'} height={20} width={20} alt='loading' />) : (<Comment postid={id} userid={details.padmin} prompt={details.prompt} tag={details.tag} username={user.username} img={user.image} email={user.email} />)
        }
      </div>
    </Suspense>
  )
}

export default page
