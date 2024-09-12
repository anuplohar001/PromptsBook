import React from 'react'
import Image from 'next/image';
const Errors = () => {
    return (
        <div>
            <div className='flex m-[10vw] font-bold'>Something Went Wrong !!!
                <form action='/' className='font-normal rounded-lg flex ml-3 bg-orange-300 hover:bg-orange-400'>
                    <button className='ml-1 mr-1 flex p-1'>
                        <Image src={'/assets/reload.svg'} height={10}
                            width={10}
                            className='h-[25px] w-[25px] p-1' />
                        Try Again
                    </button></form>
            </div>
        </div>
    )
}

export default Errors
