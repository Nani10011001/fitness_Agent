import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import { useAppContext } from '../../context/Context_app'

const Signup = () => {
  const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {navigate,axios}=useAppContext()
    const inputSubmitHandler=async(e)=>{
      e.preventDefault()
try {
 
  const {data}=await axios.post("/auth/signup",{username:username,email:email,password:password},{withCredentials:true})
  console.log(data)
  if(data.success){
    toast.success(data.message)

navigate("/login")

  }
  else{
    toast.error(data.message)
  }
} catch (error) {
  console.log(error)
  toast.error("signup failed")
}
    }
  return (
   <div className='bg-primary/80 min-h-screen flex justify-center items-center'>
      <div  className='bg-slate-700 shadow-gray-400 shadow-md  h-[420px] w-[400px] rounded-lg '>
        <form onSubmit={inputSubmitHandler} className='flex flex-col'>
      <h3 className='text-center text-emerald-600 text-2xl font-bold my-4 text-primary uppercase '>signup</h3>
       <div className='px-4'>
        <input
              value={username}
        onChange={(e)=>setUsername(e.target.value)}
  
         type="text"
         placeholder='Username'
          className='w-full py-2 text-white bg-slate-600 bg-gray-200 rounded-2xl px-3 placeholder:text-gray-300 outline-none' />
      </div>
      <div className='px-4 mt-5'>
        <input
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
         type="text"placeholder='Email' 
         className='w-full py-2 text-white bg-slate-600 bg-gray-200 rounded-2xl px-3 placeholder:text-gray-300 outline-none' />
      </div>
          <div className='px-4 mt-5'>
        <input 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        type="password"placeholder='password' 
        className='w-full py-2 text-white bg-slate-600 rounded-2xl px-3 placeholder:text-gray-300 outline-none' />
      </div>
      <div className='px-4 mt-5 text-center'>
        <button type='submit'
         className='bg-emerald-500  hover:bg-emerald-600 transition-all  cursor-pointer w-full py-3 rounded-md text-slate-600 font-semibold'>Signup</button>
         </div>
      
      </form>
      <div className=' px-4 mt-5 w-full flex justify-center'>
         <button onClick={()=>window.open("http://localhost:5000/auth/google","_self")} className="px-4 cursor-pointer w-full py-2 border flex justify-center gap-2  bg-white border-slate-300 shadow-md rounded-lg text-black">
        <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
        <span className='text-gray-600'>signup with Google</span>
    </button>
      </div>
      <div className='flex justify-center mt-5'>
        <p className='text-gray-300'>if you  have account <Link  to="/login" className=" cursor-pointer text-emerald-500 underline ml-1 text-primary">Login</Link></p>
      </div>
      </div>
      
   
    </div>
  )
}

export default Signup
