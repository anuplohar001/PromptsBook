
import React, { Suspense } from 'react'
import Comment from '@components/Comment'
import { checkEnvironment } from '@lib/actions'
import Errors from '@components/Errors'
import Loader from '@components/Loader'

const CommentComp = async ({ params }) => {

  const response = await fetch(checkEnvironment().concat(`/api/prompt/${params?.id}/`), { method: "GET" })
  const data = await response.json()
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

