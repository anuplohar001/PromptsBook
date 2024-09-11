"use client";
import { useEffect } from "react";
import Image from "next/image";
export default function ErrorPage({ error, reset}) {

    useEffect(() => {
        console.error(`${error}`);
    }, [error]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-2xl text-red-500">Error fetching user's data</div>
            <button className="m-2  p-2 rounded-md shadow-lg bg-orange-300 hover:bg-orange-400 text-black flex" onClick={()=>reset()}>
                <Image src={'/assets/reload.svg'} 
                height={20}
                width={20}
                className="h-5 w-5 m-1"/>
                Try Again</button>
        </div>
    );}