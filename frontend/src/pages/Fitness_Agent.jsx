import React from 'react'
import { useState } from 'react'
import { Send } from 'lucide-react';
import { User } from 'lucide-react';
import { useAppContext } from '../context/Context_app';
import ReactMarkdown from "react-markdown"

import TypeWriterEffect from '../components/TypeWriter';
const Fitness_Agent = () => {
  const [message,setMessage]=useState([])
  const [input,settInput]=useState("")
  const [streamingText,setStreamingText]=useState("")
  const userIdtoken=localStorage.getItem('token')
const {navigate}=useAppContext()
  const handelInput=async()=>{

    try{
      if(!input) return // it prevent the if dat is nothing
      const userMessage={
        role:"user",
        text:input
      }
        
        
       setMessage((prev)=>[
        ...prev,userMessage
      ])
     
   settInput("")
    const res=await fetch("http://localhost:8080/api/send",{
      method:"POST",
      headers:{"Content-Type":"application/json"},

      
      body:JSON.stringify({
        userId:userIdtoken,
        content:userMessage.text
      })
    })
    const reader=res.body.getReader()
    const decoder=new TextDecoder();
    let fullText="";
console.log("reader_data:",reader)
console.log("decoder_data:",decoder)

    while(true){
      const {value,done}=await reader.read();
      console.log("vlaue_data:",value)
      console.log("done_data:",done)
      if(done) break;
      const chunk=decoder.decode(value,{stream:true})
      fullText=fullText+chunk
      setStreamingText(fullText);
    }
      const aiMessage={
        role:"ai",
        text:fullText
        
      }
      console.log(message)
   setMessage((prev)=>[
    ...prev,aiMessage
   ])

  
   setStreamingText("")

    } catch (error) {
      console.log(error)
      
    }
  }
  const enterkeyDown=(e)=>{
  
    if(e.key==="Enter"){
        e.preventDefault()
      handelInput()
    }
  }

  return (
    <div className=' flex h-screen overflow-hidden text-white'>
      
<div className=' min-w-[20%] bg-slate-900'>
   <div className='flex mt-3  font-medium text-white'>
  <div>  <h3 className='px-3'>previous Days</h3></div>
  <div className=''></div>
   </div>
   <div className='absolute bottom-0 px-3 mb-10'> <button onClick={()=>navigate('/')} className='flex cursor-pointer gap-1 '><User/>profile</button></div>
</div>
      
<div className='flex flex-col w-full bg-slate-800 '>
   {/* chat setction */}
   <div className='  bg-slate-900 w-full py-4 '>
    
    <h1 onClick={()=>navigate('/')}
    className='font-bold text-3xl  text-center cursor-pointer '>Aura_Ai</h1>

   </div>
{/*    chatbody */}
< div className="flex-1 overflow-y-auto space-y-6 px-9 pt-28 pb-24">


 
 
{message.map((msg, index) => (
  <div
    key={index}
    className={`flex my-2 ${
      msg.role === "user" ? "justify-end" : "justify-start"
    }`}
  >
    <div
      className={`
        px-4 py-2 whitespace-pre-wrap text-white
        ${
          msg.role === "user"
            ? "bg-gray-700 rounded-2xl rounded-br-none max-w-[70%]"
            : "bg-slate-800   max-w-[85%]"
        }
      `}
    >
      {msg.role === "ai" ? (
        <ReactMarkdown>{msg.text}</ReactMarkdown>
      ) : (
        msg.text
      )}
    </div>
  </div>
))}

{streamingText && (
  <div className="flex my-2 justify-start">
    <div className="relative inline-block bg-slate-800 px-4 py-2  max-w-[85%] text-white whitespace-pre-wrap">
 <ReactMarkdown>
     {streamingText}
     
 </ReactMarkdown>
  <span className="inline-block ml-1 w-[2px] h-[1.2em] bg-white animate-blink" />
    </div>
  </div>
)}




</div>

<div className='flex px-3 relative '>
  <input type="text"placeholder='How can help you ?' 
  onChange={(e)=>settInput(e.target.value)}
  value={input}
  onKeyDown={enterkeyDown}
  className='bg-slate-900 outline-none my-3 w-full py-3 rounded-2xl pr-12  pl-4 ' />
  <button onClick={handelInput}
  className='absolute cursor-pointer top-1/2 right-5 -translate-y-1/2'><Send/></button>
</div>
      </div>
   
 
    </div>
  )
}

export default Fitness_Agent
