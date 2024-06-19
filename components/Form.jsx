"use client"
import React from 'react'

const Form = ({ type }) => {
    return (
        <div className='ml-20'>
            <h1 className='gradient-text'>
                {type} post
            </h1>
            <form action="" className='flex flex-col'>
                <label htmlFor="" className='flex flex-col'>
                    <span className='my-5 font-semibold'>
                        {type} Post
                    </span>
                    <textarea name="prompt"
                        placeholder='Create your Prompt'
                        id="" className='mb-10 h-44 w-[50vw] p-2 rounded-md shadow-xl'
                    ></textarea>
                </label>
                <label htmlFor="" className='flex flex-col'>
                    <span className='mb-4 font-semibold'>
                        Related To (#webdevelopment, #idea, #coding)
                    </span>
                    <input className='rounded-md p-2 w-[50vw] shadow-xl' placeholder='#tag' type="text" name="" id="" />
                </label>
            </form>
        </div>
    )
}

export default Form
