
import React from 'react'
import Comment from '@components/Comment'
import { checkEnvironment } from '@lib/actions'
import Errors from '@components/Errors'

const page = async ({ params }) => {

  const response = await fetch(checkEnvironment().concat(`/api/prompt/${params?.id}/`), { method: "GET" })
  const data = await response.json()

  if (!response.ok)
    return (<Errors/>)

  return (

    <div>
      {
        response.ok && (<Comment postid={params?.id} userid={data.padmin} prompt={data.prompt} tag={data.tag} username={data.padmin.name} img={data.padmin.image} email={data.padmin.email} />)
      }      
    </div>
  )
}

export default page
