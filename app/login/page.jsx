"use client"

import React, {useState} from 'react'
import Image from 'next/image'
import { signIn } from "next-auth/react";
import close from '@public/assets/close.svg'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const page = () => {

    const router = useRouter()
    const [error, seterror] = useState("")

    async function socialLogin(e) {
        e.preventDefault()
       if(await signIn('google')){
           router.push("/")
       }
    }

    async function credentialLogin(e) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        try {
            const response = await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirect: false
            });


            if(response.ok)
                router.push("/")
            else{
                seterror(response.error)
            }
            return response
        } catch (error) {
            console.log(error)
        }
    }

  return (
      <div className="register">
          <div className="relative p-4 w-[52vh] max-w-md h-full md:h-auto ">
              <div className="relative gradient rounded-lg shadow">
                  <Link href='/' type="button" className="btnclose">
                      <Image src={close} alt='close' height={20} width={20} />
                  </Link>

                  <div className="p-5">
                      <div className="text-center">
                          <p className="mt-2 mb-3 text-xl font-semibold leading-5 text-slate-900">
                              Login to your account
                          </p>
                          <p className="mt-2 text-sm leading-4 text-slate-600">
                              You must be logged in to perform the action.
                          </p>
                      </div>

                      <div className="mt-7 flex flex-col gap-2">
                          <button
                              onClick={socialLogin}
                              className="btnGoogle">
                              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-[18px] w-[18px] " />
                              Continue with Google
                          </button>
                      </div>

                      <div className="flex w-full items-center gap-2 py-3 text-sm text-slate-600">
                          <div className="h-px w-full bg-slate-200"></div>
                          OR
                          <div className="h-px w-full bg-slate-200"></div>
                      </div>


                      <form onSubmit={credentialLogin} name='userinfo' autoComplete='true' className="w-[40vh]">

                          <input name="email" type="email" className="mt-2 userinfo" placeholder="Email Address" />
                          <input name="password" type="password" className="mt-2 userinfo" placeholder="Password" />
                          {
                            error && <div className='p-2 my-2 bg-red-600 text-white rounded-md text-sm text-center'>! {error}</div>
                          }
                          <button type='submit' className="btnCred"> Log In  </button>

                      </form>
                      <div className="mt-6 text-center text-sm text-slate-800">
                          Don't have an account ? {" "}
                          <Link href='/register' className="font-medium text-[#4285f4]">Sign up</Link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default page
