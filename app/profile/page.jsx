
import Profile from '@components/Profile'
export const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "http://prompts-book.vercel.app";

  return base_url;
}
const page = async({params}) => {
  
  console.log(params)
  const response = await fetch(checkEnvironment().concat(`/api/users/${params?.id}/posts`));
  const posts = await response.json();
  // const post = getPosts(session?.user.id)
  // const like = getLikedPosts(session?.user.id)

  return (
    <div>
      {/* {posts[0]._id} */}
      <Profile myPost={posts} username="My Posts" updatePr={true} />
    </div>
  )
}

export default page
