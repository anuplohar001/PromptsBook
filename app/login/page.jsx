"use client"

import React, {useState} from 'react'
import Image from 'next/image'
import { signIn } from "next-auth/react";
import close from '@public/assets/close.svg'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const page = () => {

    const [password, setpassword] = useState("password")
    const [info, setinfo] = useState({email:"dummy123@gmail.com", password:"1234"})
    const router = useRouter()
    const [error, seterror] = useState("")

    async function socialLogin(e) {
        e.preventDefault()
        const response = await signIn("google", {
            callbackUrl: '/'
        })
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

    const handlePassword = () => {
        if (password === 'password')
            setpassword("text")
        else
            setpassword("password")
    }

    const handlechange = (e) =>{
        setinfo({...info, [e.target.name]:[e.target.value]})
    }

  return (
      <div className="register ">
          <div className="relative p-4 w-[52vh] max-w-md h-full md:h-auto ">
              <div className="relative navbg rounded-lg shadow comp-animation">
                  <Link href='/' type="button" className="btnclose">
                      <Image src={close} alt='close' height={20} width={20} />
                  </Link>

                  <div className="p-5 ">
                      <div className="text-center">
                          <p className="mt-2 mb-3 text-xl font-semibold leading-5 text-white">
                              Login to your account
                          </p>
                          <p className="mt-2 text-sm leading-4 text-white">
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

                          <input name="email" type="email" className="mt-2 userinfo" placeholder="Email Address" value={info.email} onChange={handlechange}/>
                          <div className='userinfo'>
                              <input name="password" type={password} className="" placeholder="Password" value={info.password} onChange={handlechange}/>
                              <Image
                                  src={password==='password' ? "assets/show.svg" : "assets/hide.svg"}
                                  height={20}
                                  width={20} 
                                  alt='eye'
                                  onClick={handlePassword}/>
                          </div>
                          
                          {
                            error && <div className='p-2 my-2 bg-red-600 text-white rounded-md text-sm text-center'>! {error}</div>
                          }
                          <button type='submit' className="btnCred"> Log In  </button>

                      </form>
                      <div className="mt-6 text-center text-sm text-white">
                          Don't have an account ? {" "}
                          <Link href='/register' className="font-medium text-white">Sign up</Link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default page
