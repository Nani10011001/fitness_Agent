import React from 'react'
import auraLogo from "../assets/logo.png"
import { Link, useNavigate } from 'react-router-dom'
const NavBar = () => {
  const navigate=useNavigate()
  return (
    <header>
        <nav className=' px-15 flex justify-between items-center text-white cursor-pointer py-4'>
     <h1 onClick={navigate("/")} className='font-bold'>AURA_AI</h1>
       
             
            <Link to="/signup" className='border hover:scale-103 cursor-pointer border-slate-400/40 px-6 font-semibold rounded-md py-2 text-slate-200 hover:bg-white/5
'>Signup</Link>
     
        </nav>
    </header>
      

  )
}

export default NavBar
