//USER PROFILE
import Profile from '@components/Profile'
import { checkEnvironment } from '@lib/actions';
function getrandom(count) {
  return Math.floor(Math.random() * count)
}
const ProfileComp = async ({ params }) => {

  const response = await fetch(checkEnvironment().concat(`/api/users/${params?.id}/posts`));
  const data = await response.json();
  const random = getrandom(2)
  if (!response.ok)
    return (<div className='m-[10vw] text-red-600 font-bold'>Something Went Wrong !!!</div>)

  return (
    <div className='m-4 ml-5 mt-9'>
      {
        response.ok && (<Profile myPost={data} username={data[0].padmin.username} />)
      }

    </div>
  )
}


export default ProfileComp
