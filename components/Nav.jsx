"use client"
import Link from "next/link";
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import add from '@public/assets/add.svg'
import out from '@public/assets/out.svg'
import logo from '@public/assets/logo.jpg'

const Nav = () => {

    const { data: session } = useSession();
    const [provider, setProvider] = useState(null)

    useEffect(() => {
        const setUp = async () => {
            const response = await getProviders()
            setProvider(response)
        }

        setUp();
    }, [])

    return (

        <div className="w-full mt-2 flex justify-around">
            <Link href='/' className="flex gap-1">
                <Image src={logo}
                    alt="Logo"
                    height={50}
                    width={50}
                    className="rounded-full"
                />
                <span className="m-4 text-xl font-bold">PromptsBook</span>
            </Link>
            {
            }
            <div>
                {
                    session?.user ? (
                        <div className="flex gap-5 text-black font-semibold">
                            <Link href='/create-prompt' className="flex gap-2 p-2 bg-orange-300 hover:bg-orange-400 rounded-full text-sm">
                                <Image
                                    src={add}
                                    alt="Add"
                                    height={15}
                                    width={15}
                                />
                                Create Posts</Link>
                            <Link onClick={signOut} href='/' className="flex gap-2 p-2 bg-orange-300 hover:bg-orange-400 rounded-full text-sm">
                                <Image
                                    src={out}
                                    height={15}
                                    width={15} />
                                Sign Out</Link>
                            <Link href='/profile' >
                                <Image
                                    className="rounded-full"
                                    src={session?.user.image}
                                    alt="Profile Img"
                                    width={40}
                                    height={40}
                                />
                            </Link>
                        </div>
                    ) : (<div className="flex gap-4">
                        {provider && Object.values(provider).map((provider) => (
                            <button key={provider.name} onClick={() => signIn(provider.id)} className="py-2 px-3 bg-black text-white hover:bg-white hover:text-black hover:font-semibold rounded-full text-sm">{`${provider.name}`}</button>
                        ))}
                    </div>
                    )


                }
            </div>
        </div>
    )
}

export default Nav