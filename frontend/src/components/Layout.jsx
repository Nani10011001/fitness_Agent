import React from 'react'
import toast from 'react-hot-toast'
const Layout = () => {
    const logout=()=>{
        localStorage.removeItem('token')
        toast.success("logout successfull")
        
    }
  return (
    <div>
         <button onClick={logout} 
className='border hover:scale-103 cursor-pointer border-slate-400/40 px-6 font-semibold rounded-md py-2 text-slate-200 hover:bg-white/5'>Logout</button>
         
    </div>
  )
}

export default Layout
