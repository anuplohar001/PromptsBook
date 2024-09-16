"use client"
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
export const Story = ({img, handleStory}) => {
    const {data: session} = useSession()
    return(
        <div className="p-1 min-h-[60px] h-[60px] w-[60px] min-w-[60px] rounded-full bg-white border-2 border-pink-400 cursor-pointer" onClick={handleStory}>
            <Image src={img}
            alt="userimg"
            height={20}
            width={20}
            className="h-[48px] w-[48px] rounded-full"/>
        </div>
    )
}