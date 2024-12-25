"use client"
import React, { useState, useEffect, useRef } from 'react'
import socket from '@lib/socket'
import { serverUrl } from '@lib/actions'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

const page = () => {


    const [users, setusers] = useState([])
    const chatContainerRef = useRef(null)
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('')
    const { data: session } = useSession();
    const [username, setUsername] = useState({
        id: "66fe820a361df8729883be35",
        name: "AshwiniJanrao",
        img: "https://lh3.googleusercontent.com/a/ACg8ocJ0OsccDMYiM12NBJ4OuNd_ReavgfRY0zXC783gevTUmYCC6BLU=s96-c"
    });



    const getMessages = async () => {
        const response = await fetch(serverUrl().concat('/messages'), {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
        const olddata = await response.json();
        olddata.messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        setMessages(olddata.messages)
    }

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

    const sendMessage = () => {
        const msg = { from: session?.user.id, to: username.id, text: message }
        socket.emit("sendMessage", msg)
        setMessage('')
    }

    const processDate = (olddate) => {

        let dateTime = olddate.substring(0, olddate.length - 3);
        const [date, time] = dateTime.split(" ");
        const [year, month, day] = date.split("-");
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const formattedDateTime = `${time} ${day} ${monthNames[parseInt(month) - 1]}`;
        return formattedDateTime
    }



    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        getMessages()
        getUsers()
        socket.on("receiveMessage", (data) => {
            setMessages((prevMessages) => [...prevMessages, data])
        })

        return () => {
            console.log("disconnected")
            socket.off()
        }
    }, [])



    return (
        <div className="flex h-screen w-screen ">
            <div className="w-1/3 m-4 p-4 rounded shadow-md border border-white">
                <h1 className='text-lg text-center'>All Chats</h1>
                <div>
                    {
                        users.map((user, index) => (
                            <div key={user._id}>
                                {

                                    user._id !== session?.user.id && (
                                        <div onClick={() => setUsername({ id: user._id, name: user.username, img: user.image })} className='flex m-3 border-2 p-3 rounded-lg hover:bg-slate-400 cursor-pointer duration-700'>
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

            <div className="flex flex-col flex-grow m-4 p-4 gradient rounded shadow-md border border-white">
                <div className='justify-center flex gap-3'>
                    <Image className='rounded-full' src={username.img} width={30} height={30} alt='img' />
                    <div>{username.name}</div>
                </div>
                <div ref={chatContainerRef} className="text-right overflow-y-auto flex-grow space-y-4 px-2">

                    {messages.map && messages.map((msg, index) => (
                        <div key={index}>
                            {
                                ((msg.from === session?.user.id && msg.to === username.id) || (msg.from === username.id && msg.to === session?.user.id)) && (<div className={`flex items-center ${msg.from === session?.user.id ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${msg.from === session?.user.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                        <div >
                                            {msg.text}
                                        </div>
                                        <div className='text-[10px]'>
                                            {processDate(msg.date)}
                                        </div>
                                    </div>
                                </div>)
                            }

                        </div>
                    ))}
                </div>

                <div className="flex items-center border-t border-gray-300 mt-4 pt-4">
                    <input
                        type="text"
                        placeholder="Type a message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <button
                        className="ml-2 px-4 py-2 bg-green-400 text-white rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring focus:ring-blue-300"
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>

    )
}

export default page
