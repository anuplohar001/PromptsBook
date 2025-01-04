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

        <div className="min-w-[14vw] h-[100vh]  flex flex-col transition-all p-3 navbg">

            <Link href='/' className="flex gap-1 mt-[15px]">
                <Image src='/assets/logo.svg'
                    alt="Logo"
                    height={50}
                    width={50}
                    className="rounded-full w-[3vw] h-[3vw]"
                />
                <span className="top-left-font">PromptsSy</span>
            </Link>

            <div className="mt-6 flex flex-col text-white font-semibold text-[15px] h-[90vh]">
                <div className="flex flex-col justify-evenly h-[85vh]">
                    <Link href='/' className="w-[12vw] flex gap-2 p-2 rounded-lg bg-violet-500 hover:bg-violet-800 hover:duration-500">
                        <Image
                            src='/assets/home.svg'
                            alt="Add"
                            height={15}
                            width={15}
                            className="w-6 h-6"
                        /> <div className="lg:block hidden">Home</div></Link>
                    <button className="w-[12vw] flex gap-2 p-2 rounded-lg bg-violet-500 hover:bg-violet-800 hover:duration-500 ">
                        <Image
                            src='/assets/search.svg'
                            alt="Add"
                            height={15}
                            width={15}
                            className="w-6 h-6"
                        />
                        <div className="lg:block hidden">Search</div>
                    </button>
                    {
                        session?.user ? (
                            <>
                                <Link href='/create-prompt' className="w-[12vw] flex gap-2 p-2 rounded-lg bg-violet-500 hover:bg-violet-800  hover:duration-500">
                                    <Image
                                        src='/assets/add.svg'
                                        alt="Add"
                                        height={15}
                                        width={15}
                                        className="w-6 h-6"
                                    />
                                    <div className="lg:block hidden">Create Post</div></Link>

                                <Link href='/message' className="w-[12vw] flex gap-2 p-2 rounded-lg bg-violet-500 hover:bg-violet-800  hover:duration-500">
                                    <Image
                                        src='/assets/messages.svg'
                                        alt="Add"
                                        height={15}
                                        width={15}
                                        className="w-6 h-6"
                                    />
                                    <div className="lg:block hidden">Messages</div></Link>

                                <Link onClick={() => signOut({ callbackUrl: '/' })} href='/' className="w-[12vw] flex gap-2 p-2 rounded-lg bg-violet-500 hover:bg-violet-800  hover:duration-500">
                                    <Image
                                        src='/assets/out.svg'
                                        alt="sign out"
                                        height={15}
                                        width={15}
                                        className="w-6 h-6" />
                                    <div className="lg:block hidden">Sign Out</div></Link>
                                <Link className="w-[12vw] cursor-pointer p-1 flex rounded-lg bg-violet-500 hover:bg-violet-800 hover:duration-500" href={`/profile/${session?.user.id}`} >
                                    <Image
                                        className="rounded-full m-1 w-6 h-6"
                                        src={session?.user.image ? session?.user.image : '/assets/user.jpg'}
                                        alt="Profile Img"
                                        width={40}
                                        height={40}
                                    />
                                    <div className="lg:block hidden">My Profile</div>
                                </Link>
                            </>

                        ) : (<Link href='/login' className="p-2 w-[12vw] h-12 rounded-lg bg-violet-500 hover:bg-violet-800  hover:duration-500 flex">
                            <Image src={'/assets/signin.svg'}
                                alt="SignIn"
                                height={5}
                                width={5}
                                className="w-6 h-6 " />
                                <div className="m-1 lg:block hidden">Sign In</div>
                        </Link>)

                    }
                </div>


            </div>
        </div>
    )
}

export default Nav