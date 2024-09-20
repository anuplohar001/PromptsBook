'use client'
import React, {useEffect} from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation'

const Errors = () => {

    const router = useRouter()

    useEffect(() => {   
        setTimeout(() => {            
            router.refresh()
            console.log("Refreshing");
        }, 3000);           
    },[])
    
    return (
        <div>
            <div className='flex lg:flex-row flex-col m-[10vw] font-bold w-max text-center'>Something Went Wrong !!! &nbsp; 
                <div>Retrying in 3 seconds &nbsp; </div>
                <div>or</div>
                <form className='font-normal rounded-lg flex ml-3 bg-orange-300 hover:bg-orange-400'>
                    <button className='ml-1 mr-1 flex p-1 w-max' onClick={()=>router.refresh()}>
                        <Image src={'/assets/reload.svg'} height={10}
                            width={10}
                            alt='reload'
                            className='h-[25px] w-[25px] p-1' />
                        Try Again
                    </button></form>
            </div>
        </div>
    )
}

export default Errors

