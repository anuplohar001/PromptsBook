"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { serverUrl } from '@lib/actions'
import { toast } from 'sonner'
const Stories = ({ user, oldStory }) => {

    const [story, setstory] = useState("")
    const { data: session } = useSession()
    const [pending, setPending] = useState(false)
    const image = oldStory.length ? (oldStory[0].userid.image) : (session?.user.image)
    const name = oldStory.length ? (oldStory[0].userid.username) : (session?.user.name)
    const [storytransition, setstorytransition] = useState(1)


    useEffect(() => {
        const e = document.getElementById(`${storytransition}`)
        if (e) {
            setTimeout(() => {
                e.style.backgroundColor = "#FBB03B"
                setTimeout(() => {e.style.backgroundColor = "transparent"}, 800);
                e.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "center"
                })
                setstorytransition(storytransition + 1)

            }, 5000);

        } else {
            setstorytransition(0)
        }

    }, [storytransition])


    const handleStory = async () => {
        try {
            setPending(true)
            const response = await fetch(serverUrl().concat("/postStory"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    story: story,
                    userid: user
                })
            })
            if (response.ok) {
                setstory("")
                setPending(false)
                toast.success("Story Posted")
            }
        } catch (error) {
            console.log(error)
            setPending(false)
        }
    }


    const deleteStory = async (item) => {
        if (confirm("Are your sure you want to delete this story")) {
            try {
                const response = await fetch(serverUrl().concat(`/deleteStory/${item._id}`), {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (response.ok) {
                    toast.success("Story deleted Successfully")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 w-[100vw] h-[100vh] z-10  bg-black/70' >
            <Link href={'/'}>
                <Image src={"/assets/close.svg"} alt='close' height={25} width={25} className='m-5 ml-[90vw] gradient rounded-md cursor-pointer' />
            </Link>

            <div className='h-[70vh] w-[40vw] ml-[30vw] flex flex-col gradient rounded-lg comp-animation'>
                <Link href={`/profile/${user}`} className='flex mt-4 ml-4 mb-1 h-max'>

                    <Image src={image} height={35} width={35} alt='user' className='rounded-full' />
                    <div className='ml-2 font-bold'>{name}</div>
                </Link>

                <div className='my-[5vh] w-max h-[49vh] rounded-sm p-1'>
                    <div className='flex  w-[35vw] h-[40vh] overflow-x-scroll ml-8 '>
                   
                        <div id='anups' className="flex gap-7 ">

                            {
                                oldStory.length ? (oldStory.map((item, index) => (
                                  (<div key={item._id} id={index} className='box border-2 rounded-md min-w-56 text-center relative'>
                                        <div className='h-[27vh] m-4 overflow-y-scroll'>{item.story}</div>
                                        <div onClick={() => deleteStory(item)} className='cursor-pointer w-max h-max absolute right-0'>
                                        {
                                                session?.user.id === user && (<Image
                                                    src={'/assets/trash.svg'}
                                                    height={25}
                                                    width={25}
                                                    alt='delete' />)
                                        }
                                            
                                        </div>
                                    </div>)
                                ))) : (<div>Tap below to add story</div>)
                            }
                        </div>
                    </div>
                    <div >

                        {
                            session?.user.id === user && (<div className='flex m-3 ml-8 bg-white h-12 rounded-full'>
                                <textarea type="text" placeholder='Type here to add to Story' onChange={(e) => setstory(e.target.value)} value={story} className='mt-1 h-10 w-[28vw] p-2 pl-3 rounded-full focus:outline-none'></textarea>

                                {
                                    story && (<Image src={'/assets/send.png'} alt='send' height={30} width={30} className='m-2 cursor-pointer' onClick={handleStory} />)
                                }
                                <div>
                                    {
                                        pending && (<div className="mt-3 animate-spin h-6 w-6 rounded-full border-[3px] border-blue-500 border-t-white">
                                        </div>)
                                    }
                                </div>
                            </div>)
                        }

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Stories
