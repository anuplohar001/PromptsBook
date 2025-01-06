import React, { useState, useEffect, useRef } from 'react';
import { serverUrl } from '@lib/actions';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Card from './Card';
import Loader from './Loader';
import socket from '@lib/socket'

const Share = ({ handleshare, item }) => {

    const modalRef = useRef(null);
    const modalReff = useRef(null);
    const [users, setusers] = useState([]);
    const [pending, setPending] = useState(false);
    const [pendingShare, setPendingShare] = useState(false);
    const [selectedUsers, setselectedUsers] = useState([]);
    const [checkedStates, setCheckedStates] = useState({});
    const { data: session } = useSession();

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setselectedUsers((prev) => [...prev, value]);
        } else {
            setselectedUsers((prev) => prev.filter((label) => label !== value));
        }
        setCheckedStates((prev) => ({
            ...prev,
            [value]: checked,
        }));
    };

    const getUsers = async () => {
        setPending(true);
        const response = await fetch(serverUrl().concat('/users'), {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();
            setusers(data.users);
            const initialCheckedStates = {};
            data.users.forEach((user) => {
                initialCheckedStates[user._id] = false;
            });
            setCheckedStates(initialCheckedStates);
            setPending(false);
        }
    };

    const handleMessage = async () => {
        setPendingShare(true)
        selectedUsers.map((userid, index) => {
            handleForUser(userid);
        });

        setselectedUsers([]);
        setCheckedStates((prev) => {
            const resetCheckedStates = { ...prev };
            Object.keys(resetCheckedStates).forEach((key) => {
                resetCheckedStates[key] = false;
            });
            return resetCheckedStates;
        });
        setTimeout(() => {            
            setPendingShare(false)
        }, 2000);
    };

    const handleForUser = async (userid) => {
        const msg = { from: session?.user.id, to: userid, text: "POST", postid: item._id };
        socket.emit("sendMessage", msg);
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            if (modalReff.current && !modalReff.current.contains(event.target)) {
                handleshare();
            }
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div onClick={(e) => { handleClickOutside(e) }} className="flex h-[95vh] w-[80vw] bg-black/70 z-50 absolute rounded-sm">
            <div className="relative w-full h-full">
                <Image
                    height={25}
                    width={25}
                    src={'/assets/close.svg'}
                    alt="close"
                    className="cursor-pointer p-1 m-5 ml-[60vw] navbg hover:bg-purple-400 rounded-md absolute"
                    onClick={handleshare}
                />

                <div className="w-max m-16 ml-32 flex">
                    <div>
                        <div ref={modalRef}>
                            <Card
                                prompt={item.prompt}
                                tag={item.tag}
                                postid={item._id}
                                username={item.padmin.username}
                                userid={item.padmin._id}
                                img={item.padmin.image}
                                email={item.padmin.email}
                            />
                        </div>
                        <div className="m-5 text-white italic font-bold text-xl">
                            You can share this POST &#128070;
                            <br />
                            to these USERS &#128073;
                        </div>
                    </div>
                    <div ref={modalReff} className="navbg ml-5 p-2 pb-3 rounded-md w-[300px] overflow-scroll h-[25rem] border-2 py-2">
                        <div className='h-[20rem] overflow-y-scroll'>
                            {pending ? (
                                <Loader />
                            ) : (
                                <div>
                                    {users.map((user, index) => (
                                        <div key={user._id}>
                                            {user._id !== session?.user.id && (
                                                <div className='flex'>
                                                    <label htmlFor={`${user._id}`} className="text-white flex m-3 border-2 p-3 rounded-lg hover:bg-purple-400 cursor-pointer duration-700 w-60">
                                                        <input
                                                            value={`${user._id}`}
                                                            type="checkbox"
                                                            className='ml-1 mr-2'
                                                            id={`${user._id}`}
                                                            onChange={handleCheckboxChange}
                                                            checked={checkedStates[user._id] || false}
                                                        />
                                                        <Image
                                                            className="rounded-full"
                                                            src={user.image}
                                                            width={30}
                                                            height={30}
                                                            alt="img"
                                                        />
                                                        <div className="mx-3">{user.username}</div>
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {
                            selectedUsers.length !== 0 && (
                                <div onClick={handleMessage} className='cursor-pointer mt-4 rounded-lg text-white bg-purple-500 hover:bg-purple-700 text-center p-2 duration-500'>
                                    {pendingShare ? "Sending..." : "Send"}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;

