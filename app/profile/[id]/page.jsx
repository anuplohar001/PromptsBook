//USER PROFILE
import Errors from '@components/Errors';
import Loader from '@components/Loader';
import Profile from '@components/Profile'
import { checkEnvironment } from '@lib/actions';
import { Suspense } from 'react';

const ProfileComp = async ({ params }) => {
  
  const userid = params?.id
  const response = await fetch(checkEnvironment().concat(`/api/users/${userid}/posts`));
  const data = await response.json();
  
  if (!response.ok)
    return (<Errors/>)

  return (
    <div className='m-4 ml-5 mt-9'>
      {
        response.ok && (<Profile myPost={data} username={data[0].padmin.username} />)
      }

    </div>
  )
}

const page = ({params}) => {
  return (
    <Suspense fallback={<Loader/>}>
      <ProfileComp params={params}/>
    </Suspense>
  )
}

export default page

