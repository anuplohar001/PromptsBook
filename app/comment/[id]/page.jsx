
import React from 'react'
import Comment from '@components/Comment'
import { checkEnvironment } from '@lib/actions'

const page = async ({ params }) => {

  const response = await fetch(checkEnvironment().concat(`/api/prompt/${params?.id}/`), { method: "GET" })
  const data = await response.json()

  if (!response.ok)
    return (<div className='m-[10vw] text-red-600 font-bold'>Something Went Wrong !!!</div>)

  return (

    <div>
      {
        response.ok && (<Comment postid={params?.id} userid={data.padmin} prompt={data.prompt} tag={data.tag} username={data.padmin.name} img={data.padmin.image} email={data.padmin.email} />)
      }      
    </div>
  )
}

export default page
