//USER PROFILE
import Profile from '@components/Profile'
import { checkEnvironment } from '@lib/actions';

const ProfileComp = async ({ params }) => {
  
  const response = await fetch(checkEnvironment().concat(`/api/users/${params?.id}/posts`));
  const data = await response.json();

  if(!data)
    throw new Error("Error in fetching user's data")
  
  return (
    <div className='m-4 ml-5 mt-9'>
      <Profile myPost={data} username={data[0].padmin.username} />
    </div>
  )
}


export default ProfileComp
