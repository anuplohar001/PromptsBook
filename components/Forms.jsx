"use client"

import React from 'react'

const Forms = ({ type, handleClick, post, setPost }) => {

    return (

        <div className='ml-20 comp-animation'>
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
                        id=""
                        className='mb-10 h-44 w-[50vw] p-2 rounded-md shadow-xl'
                        value={post.prompt}
                        onChange={(e) => setPost({ ...post, prompt: (e.target.value) })}
                    ></textarea>
                </label>

                <label htmlFor="" className='flex flex-col'>
                    <span className='mb-4 font-semibold'>
                        Related To (#webdevelopment, #idea, #coding)
                    </span>
                    <input className='rounded-md p-2 w-[50vw] shadow-xl'
                        placeholder='#tag'
                        value={post.tag}
                        type="text"
                        onChange={(e) => setPost({ ...post, tag: e.target.value })}
                    />
                </label>
            </form>
            <form>
                <button
                    onClick={handleClick}
                    className="shadow-xl my-4 w-20 p-2 bg-orange-400 text-white rounded-full text-sm" >{type}...</button>
            </form>
        </div>
    )
}

export default Forms
