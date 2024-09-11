"use client";
import Image from "next/image";
export default function ErrorPage({ error, reset}) {


    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-2xl text-red-500">Error in fetching comments</div>
            <button className="m-2  p-2 rounded-md shadow-lg bg-orange-300 hover:bg-orange-400 text-black flex" onClick={()=>reset()}>
                <Image src={'/assets/reload.svg'} 
                height={20}
                width={20}
                alt="reload"
                className="h-5 w-5 m-1"/>
                Try Again</button>
        </div>
    );}