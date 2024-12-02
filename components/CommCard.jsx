import React, { useState } from 'react'
import Image from 'next/image'
import { Helmet } from "react-helmet";
import { useSession } from 'next-auth/react';
import { serverUrl } from '@lib/actions';

const CommCard = ({ comentid, comment, img, username, oldcomments, userid }) => {

    const { data: session } = useSession()
    const [like, setlike] = useState("unlike")
    const handlelike = () => {
        if (like === 'unlike') {
            setlike('like')
        } else {
            setlike('unlike')
        }
    }

    const handledelete = async () => {
        if (confirm("Are you sure you want to delete this comment")) {
            try {
                const response = await fetch(serverUrl().concat(`/deleteComment?id=${comentid}`), { 
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                 })

                if (response.ok) {
                    alert("comment deleted")
                    oldcomments()
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className='comp-animation m-2 p-1 flex h-[8vh] w-[27vw] rounded-xl bg-white'>
            <div className='flex cursor-pointer'>
                <Image src={img} alt="userimg" height={10} width={10} className='w-[30px] h-[30px] m-1 rounded-full  border-black' />
                <div className='ml-2 mr-3 mt-2 text-[11px] w-max'>
                    {username}
                </div>
            </div>
            <div className='text-m font-semibold w-[13vw] mt-1 overflow-scroll'>
                {comment}
            </div>
            <div className='flex' >
                <Image src={`/assets/${like}.svg`} height={20} width={20} alt='like' className='w-[20px] h-[20px] mt-2' onClick={handlelike} />
                <div className='cursor-pointer ml-2' onClick={handledelete}>
                    {
                        session?.user.id === userid && (<div className='mt-2'><Helmet>
                                <script src="https://cdn.lordicon.com/lordicon.js"></script>
                            </Helmet>
                            <lord-icon
                                style={{ "width": "20px", "height": "20px" }}
                                src="https://cdn.lordicon.com/skkahier.json"
                                trigger="hover"></lord-icon>
                        </div>)
                    }

                </div>
            </div>
        </div>
    )
}

export default CommCard
