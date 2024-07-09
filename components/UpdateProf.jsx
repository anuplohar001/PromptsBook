import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
const UpdateProf = () => {

    const { data: session } = useSession()
    const [edit, setedit] = useState(false)
    const [userinfo, setuserinfo] = useState({ name: "", email: "", password: "" })
    const [pass, setpass] = useState(true)

    const getUserinfo = async () => {
        const response = await fetch(`api/users/${session?.user.id}/user`)

        const data = await response.json()
        setuserinfo({ name: data.username, email: data.email, password: data.password })
        console.log(data)
        if(data.password)
            setpass(true)
        else
            setpass(false)
    }

    useEffect(() => {
        if (session?.user.id)
            getUserinfo()
    }, [session?.user.id])


    const handleChange = (e) => {
        setuserinfo({ ...userinfo, [e.target.name]: e.target.value })
    }

    const saveInfo = async(e) => {
        setedit(false)
        if(userinfo.password)
            setpass(true)
        const response = await fetch(`api/users/${session?.user.id}/user`, {
            method: "PATCH",
            body: JSON.stringify({
                username: userinfo.name,
                email: userinfo.email,
                password: userinfo.password
            })
        })

        if(response.ok)
            alert("Profile Updated")
    }

    return (

        <div className='md:w-[40vw]'>
            <div className='lg:mx-20 mx-3 mt-5 gradient-text'>Update Profile</div>
            <div className='text-center'>
                <Image
                    src={session?.user.image ? (session?.user.image) : ("/assets/user.jpg")}
                    alt='userimage'
                    height={80}
                    width={80}
                    className='text-center rounded-full m-5 mx-[16vw]' />
            </div>


            {
                edit ? (<div className='flex flex-col gap-3 ml-6'>
                    <div>
                        Username
                        <input onChange={handleChange} name='name' value={userinfo.name} type="text" placeholder='username' className='w-[25vw] ml-5 p-3 rounded-xl shadow-2xl' />
                    </div>
                    <div>
                        Email
                        <input onChange={handleChange} name='email' value={userinfo.email} type="email" placeholder='email' className='w-[25vw] ml-12 p-3 rounded-xl shadow-2xl' />
                    </div>

                    <div className='flex flex-row'>
                        Password
                        <div className='flex flex-col gap-3'>

                            <input onChange={handleChange} name='password' value={userinfo.password} type="password"
                                placeholder={userinfo.password ? ("password") : ("create new password")}
                                className='ml-5 w-[25vw] p-3 rounded-xl shadow-2xl' />

                            {
                                !pass && (<input name='newpassword' type="password"
                                    placeholder = "confirm password"
                                    className ='ml-5 w-[25vw] p-3 rounded-xl shadow-2xl' />) 
                            }

                        </div>
                        
                    </div>
                </div>) : (<div className='flex flex-col ml-6 gap-3'>
                    <div className='flex'>
                        Username <div className='ml-5 w-[25vw] rounded-xl bg-orange-400 p-3 text-white'>{userinfo.name}</div>
                    </div>
                    <div className='flex'>

                        Email <div className='ml-12 w-[25vw] rounded-xl bg-orange-400 p-3 text-white'>{userinfo.email}</div>
                    </div>
                    <div className='flex'>

                        Password <div type='password' 
                        className='ml-5 w-[25vw] rounded-xl bg-orange-400 p-3 text-white'>{ pass ? ("******") : ("Set New password")}</div>
                    </div>

                </div>)
            }


            <div className='flex justify-center items-center mt-7 m-2 gap-8'>
                <button onClick={() => setedit(true)}
                    className='bg-red-400 rounded-2xl p-2 w-20 border focus:border-black'>Edit</button>
                <button onClick={saveInfo}
                    className='bg-green-600 text-white rounded-2xl p-2 w-20 border focus:border-black'>Save</button>
            </div>

        </div>
    )
}

export default UpdateProf
