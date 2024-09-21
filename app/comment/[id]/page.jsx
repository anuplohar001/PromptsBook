
import React, { Suspense } from 'react'
import Comment from '@components/Comment'
import { serverUrl } from '@lib/actions'
import Errors from '@components/Errors'
import Loader from '@components/Loader'

const CommentComp = async ({ params }) => {

  const response = await fetch(serverUrl().concat(`/feed?id=${params?.id}`), { 
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
   })

  const prompts = await response.json()
  const data = prompts.prompts
  
  if (!response.ok)
    return (<Errors/>)

  return (

    <div>
      {
        response.ok && (<Comment postid={params?.id} userid={data.padmin._id} prompt={data.prompt} tag={data.tag} username={data.padmin.username} img={data.padmin.image} email={data.padmin.email} />)
      }      
    </div>
  )
}

const page = ({params}) => {
  return (
    <Suspense fallback={<Loader/>}>
      <CommentComp params={params}/>
    </Suspense>
  )
}

export default page

