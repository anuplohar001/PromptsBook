"use client"
import Link from "next/link";
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

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

        <div className="w-full mt-5 flex justify-around">
            <Link href='/'>
                <span className="m-4 font-bold">PromptsBook</span>
            </Link>
            {
            }
            <div>
                {           
                    session?.user ? (
                        <div className="flex gap-5">
                            <Link href='/create-prompt' className="py-2 px-2 bg-orange-400 text-white rounded-full text-sm">Create Posts</Link>
                            <Link onClick={signOut} href='/' className="py-2 px-2 bg-orange-400 text-white rounded-full text-sm">Sign Out</Link>
                            <Link href='/profile' >
                                <Image
                                    className="rounded-full"
                                    src={session?.user.image}
                                    width={40}
                                    height={40}
                                />
                            </Link>
                        </div>
                    ) :   (<>
                                {provider && Object.values(provider).map((provider) => (
                                    <button key={provider.name} onClick={()=>signIn(provider.id)} className="py-2 px-3 bg-black text-white rounded-full text-sm">{`${provider.name}`}</button>
                                ))}      
                        </>
                        )                       
                        
                    
                }
            </div>
        </div>
    )
}

export default Nav