import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import Loader from './Loader'
import { serverUrl } from '@lib/actions'
const UpdateProf = () => {

    const { data: session } = useSession()
    const [password, setpassword] = useState("password")
    const [edit, setedit] = useState(false)
    const [userinfo, setuserinfo] = useState({ name: "", email: "", password: "" })
    const [pass, setpass] = useState(true)
    const [editImage, setEditImage] = useState(false)
    const [file, setFile] = useState();
    const [dialog, setdialog] = useState(false)
    const [pending, setpending] = useState(false)

    function handleChangeFile(e) {
        // console.log(e.target.file);
        setFile(URL.createObjectURL(e.target.files[0]));
        setdialog(false)
    }

    const getUserinfo = async () => {
        setpending(true)
        const response = await fetch(serverUrl().concat(`/userInfo?id=${session?.user.id}`), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const user = await response.json()
        const data = user.user
        setuserinfo({ name: data.username, email: data.email, password: data.password })
        setpending(false)
        if (data.password)
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

    const saveInfo = async (e) => {
        setedit(false)
        if (userinfo.password)
            setpass(true)
        const response = await fetch(serverUrl().concat(`/userEdit?id=${session?.user.id}`), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: userinfo.name,
                email: userinfo.email,
                password: userinfo.password
            })
        })

        if (response.ok)
            alert("Profile Updated")
    }

    const handlePassword = () => {
        if (password === 'password')
            setpassword("text")
        else
            setpassword("password")
    }

    return (
        <>
        {
            pending ? (<Loader/>) : (<div className=''>
                <div className='text-center transition-[.3s]' onMouseLeave={() => setEditImage(false)}>

                    <Image
                        src={file ? file : session?.user.image}
                        alt='userimage'
                        height={90}
                        width={90}
                        className='text-center rounded-full m-5 mx-[16vw] '
                        onMouseEnter={() => setEditImage(true)}
                    />
                    {/* {
                    editImage && <Image src={"/assets/edit.svg"}
                        alt="edit"
                        width={30}
                        height={30}
                        className='absolute right-[28vw] top-[41vh] cursor-pointer' 
                        onClick={()=>setdialog(true)}/>
                } */}
                    {
                        dialog && <div className=' h-[20vh] w-[30vw] bg-white border rounded-lg text-center p-2 absolute'>
                            <Image src={"/assets/close.svg"}
                                alt='close'
                                height={20}
                                width={20}
                                className='cursor-pointer'
                                onClick={() => setdialog(false)} />
                            <input type="file"
                                className='rounded-lg w-[20vw] mt-4 border border-black'
                                onChange={handleChangeFile} />
                        </div>
                    }

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
                                <div className='flex ml-5 w-[25vw] rounded-xl shadow-2xl bg-white'>
                                    <input onChange={handleChange} name='password' value={userinfo.password} type={password}
                                        placeholder={userinfo.password ? ("password") : ("create new password")}
                                        className='w-[23vw] p-3 rounded-xl' />
                                    <Image
                                        src={password === 'password' ? "assets/show.svg" : "assets/hide.svg"}
                                        height={20}
                                        width={20}
                                        onClick={handlePassword} />

                                </div>

                                {
                                    !pass && (<input name='newpassword' type="password"
                                        placeholder="confirm password"
                                        className='ml-5 w-[25vw] p-3 rounded-xl shadow-2xl' />)
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
                                className='ml-5 w-[25vw] rounded-xl bg-orange-400 p-3 text-white'>{pass ? ("********") : ("Set New password")}</div>
                        </div>

                    </div>)
                }


                <div className='flex justify-center items-center mt-7 m-2 gap-8'>
                    <button onClick={() => setedit(true)}
                        className='bg-red-400 rounded-2xl p-2 w-20 border focus:border-black'>Edit</button>
                    <button onClick={saveInfo}
                        className='bg-green-600 text-white rounded-2xl p-2 w-20 border focus:border-black'>Save</button>
                </div>

            </div>)
        }
        </>
    )
}


export default UpdateProf
