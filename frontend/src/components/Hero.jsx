import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigator=useNavigate()
  return (
    <div className='flex justify-center'>
     <div className=' px-10 max-w- text-white mt-40'> 
     <h3 className='text-5xl font-extralight'>Build fitness that lasts with {" "}<span className='font-bold '>AURA_AI</span></h3>

      <p className='text-sm my-4 text-slate-300'>Your personal AI fitness companion that learns from you, remembers your progress, and guides you—one day at a time.</p>
    <div className='flex gap-4'> 
        <button onClick={()=>navigator('/Agent/ui')}
        className='bg-emerald-500 hover:scale-105 text-slate-900 px-5 font-semibold py-2 rounded-md hover:bg-emerald-600 transition-all cursor-pointer'>Get started</button>
     <button onClick={()=>navigator('/login')} className='border hover:scale-105 cursor-pointer border-slate-400/40 px-6 font-semibold rounded-md py-2 text-slate-200 hover:bg-white/5' >Login</button>
     </div>
      </div>


   
    </div>
  )
}

export default Hero
