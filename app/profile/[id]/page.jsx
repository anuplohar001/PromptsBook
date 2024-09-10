//USER PROFILE
import Profile from '@components/Profile'

export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "http://prompts-book.vercel.app";

  return base_url;
}

const ProfileComp = async ({ params }) => {

  const response = await fetch(checkEnvironment().concat(`/api/users/${params?.id}/posts`));
  const data = await response.json();
  return (
    <div className='m-4 ml-5 mt-9'>
      <div className='gradient-text '>
        {data[0].padmin.username}
      </div>
      <Profile myPost={data} username={data[0].padmin.username} />
    </div>
  )
}



const UserProfile = ({ params }) => {
  return (

    <ProfileComp params={params} />
  )
}

export default UserProfile
