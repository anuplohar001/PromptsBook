"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
export const Story = ({admin, img}) => {
    const {data : session} = useSession()
    return(
        <Link href={`/stories/${admin}`} className="mt-2 p-1 min-h-[60px] h-[60px] w-[60px] min-w-[60px] rounded-full allbg border-[3px] border-pink-400 cursor-pointer relative story">     
            <Image src={img}
            alt="userimg"
            height={20}
            width={20}
            className="h-[47px] w-[47px] rounded-full absolute"/>
            {
                admin === session?.user.id && (<Image src={'/assets/plus.svg'} alt="plus" height={17} width={17} className="absolute bottom-0 right-0 "/>)
            }
        </Link>
    )
}