"use client"

import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Image from "next/image"

const Nav = () => {

    const { data: session } = useSession()
    

    return (

        <div className="w-full mt-2 flex justify-around transition-all">
            
            <Link href='/' className="flex gap-1">
                <Image src='/assets/logo.jpg'
                    alt="Logo"
                    height={50}
                    width={50}
                    className="rounded-full"
                />
                <span className="m-4 text-xl font-bold">PromptsBook</span>
            </Link>

            <div>
                {
                    session?.user ? (
                        <div className="flex gap-5 text-black font-semibold">
                            <Link href='/create-prompt' className="flex gap-2 p-2 bg-orange-300 hover:bg-orange-400 rounded-full text-sm">
                                <Image
                                    src='/assets/add.svg'
                                    alt="Add"
                                    height={15}
                                    width={15}
                                />
                                Create Posts</Link>
                                
                            <Link onClick={() => signOut({ callbackUrl: '/' })} href='/' className="flex gap-2 p-2 bg-orange-300 hover:bg-orange-400 rounded-full text-sm">
                                <Image
                                    src='/assets/out.svg'
                                    height={15}
                                    width={15} />
                                Sign Out</Link>
                            <Link href='/profile' >
                                <Image
                                    className="rounded-full"
                                    src={session?.user.image ? session?.user.image : '/assets/user.jpg'}
                                    alt="Profile Img"
                                    width={40}
                                    height={40}
                                />
                            </Link>
                        </div>
                    ) : (<Link href='/login' className="button">Sign In</Link>)

                }
            </div>
        </div>
    )
}

export default Nav