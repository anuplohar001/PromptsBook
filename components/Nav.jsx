"use client"

import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Image from "next/image"
import {useRouter} from "next/navigation";

const Nav = () => {
    const router = useRouter()
    const { data: session } = useSession()
    

    return (

        <div className="w-full h-8 flex justify-between transition-all ">
        
            <Link href='/' className="flex gap-1">
                <Image src='/assets/logo.jpg'
                    alt="Logo"
                    height={50}
                    width={50}
                    className="rounded-full w-[4vw] h-[4vw]"
                />
                <span className="m-4 text-[18px] font-bold">PromptsBook</span>
            </Link>

            <div>
                {
                    session?.user ? (
                        <div className="flex md:flex-row flex-col gap-5 text-black font-semibold text-[15px]">
                            <Link href='/create-prompt' className="flex gap-2 p-2 bg-orange-300 hover:bg-orange-400 rounded-full text-[13px]">
                                <Image
                                    src='/assets/add.svg'
                                    alt="Add"
                                    height={15}
                                    width={15}
                                    className="w-4"
                                />
                                Create Posts</Link>
                                
                            <Link onClick={() => signOut({ callbackUrl: '/' })} href='/' className="flex gap-2 p-2 bg-orange-300 hover:bg-orange-400 rounded-full text-[13px]">
                                <Image
                                    src='/assets/out.svg'
                                    alt="sign out"
                                    height={15}
                                    width={15} 
                                    className="w-4"/>
                                Sign Out</Link>
                            <div className="cursor-pointer" onClick={() => router.push(`/profile/${session?.user.id}?name=${session?.user.name}`)} >
                                <Image
                                    className="rounded-full"
                                    src={session?.user.image ? session?.user.image : '/assets/user.jpg'}
                                    alt="Profile Img"
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </div>
                    ) : (<Link href='/login' className="button text-[13px]">Sign In</Link>)

                }
            </div>
        </div>
    )
}

export default Nav