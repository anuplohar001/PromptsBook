"use client"

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import close from '@public/assets/close.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { serverUrl } from '@lib/actions'

const page = () => {

    const router = useRouter()
    const [userinfo, setUserinfo] = useState({ email: "", username: "", phone: "", password: "" })

    const handlechange = (e) => {
        setUserinfo({ ...userinfo, [e.target.name]: e.target.value })
    }

    const userRegister = async () => {

        try {
            const response = await fetch(serverUrl().concat('api/registration'), {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: userinfo.username,
                    phone: userinfo.phone,
                    password: userinfo.password,
                    email: userinfo.email
                })
            })
            if (response.ok) {
                router.push('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="register">
            <div className="relative p-4 w-[24vw] max-w-md h-full md:h-auto gradient rounded-lg shadow">

                <Link href='/' type="button" className="btnclose">
                    <Image src={close} alt='close' height={20} width={20} />
                </Link>

                <div className="p-5">
                    <div className="text-center">
                        <p className="mt-2 mb-3 text-xl font-semibold leading-5 text-slate-900">
                            Register your account
                        </p>
                        <p className="mt-2 text-sm leading-4 text-slate-600">
                            You must be registered to perform the action.
                        </p>
                    </div>

                    <div className="mt-7 flex flex-col gap-2">
                        <button
                            onClick={() => signIn('google')}
                            className="btnGoogle">
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
                                className="h-[18px] w-[18px] " />Continue with

                            Google
                        </button>
                    </div>

                    <div className="flex w-full items-center gap-2 py-3 text-sm text-slate-600">
                        <div className="h-px w-full bg-slate-200"></div>
                        OR
                        <div className="h-px w-full bg-slate-200"></div>
                    </div>


                    <form onSubmit={userRegister} className="w-[40vh]">
                        <input onChange={handlechange} name="username" type="username" className="userinfo" placeholder="User Name" />
                        <input onChange={handlechange} name="phone" type="number" className="mt-2 userinfo" placeholder="Phone" />
                        <input onChange={handlechange} name="email" type="email" className="mt-2 userinfo" placeholder="Email Address" />
                        <input onChange={handlechange} name="password" type="password" className="mt-2 userinfo" placeholder="Password" />
                        <button type='submit' className="btnCred"> Register  </button>

                    </form>
                    <div className="mt-6 text-center text-sm text-slate-800">
                        Already have an account ? {" "}
                        <Link href='/login' className="font-medium text-[#4285f4]">Log In</Link>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default page
