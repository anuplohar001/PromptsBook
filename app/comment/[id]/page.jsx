
import React, { Suspense } from 'react'
import Comment from '@components/Comment'
import { checkEnvironment } from '@lib/actions'

const Comments = async ({ params }) => {

  const response = await fetch(checkEnvironment().concat(`/api/prompt/${params?.id}/`), { method: "GET" })
  const data = await response.json()

  if (!data) {
    return (<div className='m-[15vw] text-red-600 font-bold text-lg'>Error in fetching Comments</div>)
  }

  return (

    <div>
      {
        response.ok && (<Comment postid={params?.id} userid={data.padmin} prompt={data.prompt} tag={data.tag} username={data.padmin.name} img={data.padmin.image} email={data.padmin.email} />)
      }
      
    </div>
  )
}

const page = ({params}) => {

  return (
    <Suspense>
      <Comments params={params}/>
    </Suspense>
  )

}

export default page
