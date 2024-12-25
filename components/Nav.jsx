"use client"

import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Image from "next/image"
import { useRouter } from "next/navigation";

const Nav = () => {
    const router = useRouter()
    const { data: session } = useSession()


    return (

        <div className="min-w-[14vw] h-[100vh]  flex flex-col transition-all border-r border-pink-100 p-3 gradient">

            <Link href='/' className="flex gap-1">
                <Image src='/assets/logo.jpg'
                    alt="Logo"
                    height={50}
                    width={50}
                    className="rounded-full w-[3vw] h-[3vw]"
                />
                <span className="m-3 text-[15px] font-bold italic lg:block hidden">PromptsBook</span>
            </Link>

            <div className="mt-6 flex flex-col text-black font-semibold text-[15px] h-[70vh]">
                <div className="flex flex-col justify-between h-[70vh] ">
                    <Link href='/' className="w-[10vw] flex gap-2 p-2 rounded-full hover:bg-white hover:duration-500">
                        <Image
                            src='/assets/home.svg'
                            alt="Add"
                            height={15}
                            width={15}
                            className="w-7 h-7"
                        /> <div className="lg:block hidden">Home</div></Link>
                    <button className="w-[10vw] flex gap-2 p-2 rounded-full hover:bg-white hover:duration-500 ">
                        <Image
                            src='/assets/search.svg'
                            alt="Add"
                            height={15}
                            width={15}
                            className="w-7 h-7"
                        />
                        <div className="lg:block hidden">Search</div>
                    </button>
                    {
                        session?.user ? (
                            <>
                                <Link href='/create-prompt' className="w-[10vw] flex gap-2 p-2 rounded-full hover:bg-white hover:duration-500">
                                    <Image
                                        src='/assets/add.svg'
                                        alt="Add"
                                        height={15}
                                        width={15}
                                        className="w-7 h-7"
                                    />
                                    <div className="lg:block hidden">Create Post</div></Link>

                                <Link href='/message' className="w-[10vw] flex gap-2 p-2 rounded-full hover:bg-white hover:duration-500">
                                    <Image
                                        src='/assets/messages.svg'
                                        alt="Add"
                                        height={15}
                                        width={15}
                                        className="w-7 h-7"
                                    />
                                    <div className="lg:block hidden">Messages</div></Link>

                                <Link onClick={() => signOut({ callbackUrl: '/' })} href='/' className="w-[10vw] flex gap-2 p-2 rounded-full hover:bg-white hover:duration-500">
                                    <Image
                                        src='/assets/out.svg'
                                        alt="sign out"
                                        height={15}
                                        width={15}
                                        className="w-7 h-7" />
                                    <div className="lg:block hidden">Sign Out</div></Link>
                                <Link className="w-[10vw] cursor-pointer flex rounded-full p-1 hover:bg-white hover:duration-500" href={`/profile/${session?.user.id}`} >
                                    <Image
                                        className="rounded-full m-1 w-7 h-7"
                                        src={session?.user.image ? session?.user.image : '/assets/user.jpg'}
                                        alt="Profile Img"
                                        width={40}
                                        height={40}
                                    />
                                    <div className="lg:block hidden">My Profile</div>
                                </Link>
                            </>

                        ) : (<Link href='/login' className="p-2 w-[10vw] h-12 hover:bg-white hover:duration-500 rounded-full flex">
                            <Image src={'/assets/signin.svg'}
                                alt="SignIn"
                                height={5}
                                width={5}
                                className="w-7 h-7 " />
                                <div className="m-1 lg:block hidden">Sign In</div>
                        </Link>)

                    }
                </div>


            </div>
        </div>
    )
}

export default Nav