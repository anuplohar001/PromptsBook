import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Card from './Card'
import { serverUrl } from '@lib/actions'
import { useSession } from '@node_modules/next-auth/react'
const Share = ({ handleshare, item }) => {

    const [users, setusers] = useState([])
    const { data: session } = useSession()
    const getUsers = async () => {
        const response = await fetch(serverUrl().concat('/users'), {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
        if (response.ok) {
            const data = await response.json()
            setusers(data.users)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])


    return (
        <div className='h-[75vh] w-[80vw] bg-black/70 z-10 absolute comp-animation rounded-sm'>
            {
                console.log(item)
            }
            <Image
                height={25}
                width={25}
                src={'/assets/close.svg'}
                alt='close'
                className='cursor-pointer m-5 ml-[76vw] gradient rounded-md absolute'
                onClick={handleshare} />

            <div className='m-16 ml-32 flex'>
                <div>
                    <Card
                        prompt={item.prompt}
                        tag={item.tag}
                        postid={item._id}
                        username={item.padmin.username}
                        userid={item.padmin._id}
                        img={item.padmin.image}
                        email={item.padmin.email}
                    />
                    <div className='m-5 text-white italic font-bold text-xl'>
                        You can share this POST &#128070;
                        <br />
                        to these USERS &#128073;
                    </div>
                </div>
                <div className='gradient ml-5 p-2 rounded-md w-[280px] overflow-scroll h-[21rem]'>
                    {
                        users.map((user, index) => (
                            <div key={user._id}>
                                {

                                    user._id !== session?.user.id && (
                                        <div className='flex m-3 border-2 p-3 rounded-lg hover:bg-slate-400 cursor-pointer duration-700'>
                                            <Image className='rounded-full' src={user.image} width={30} height={30} alt='img' />
                                            <div className='mx-3'>
                                                {user.username}
                                            </div>
                                        </div>)
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Share
