import React from 'react'
import { useState } from 'react'
import { useAppContext } from '../../context/Context_app'
import toast from 'react-hot-toast'
export default function Profile_edit() {
const[profileLoading,setProfileLoading]=useState(false)
const [isLoading,setIsLoading]=useState(false)
  const[name,setName]=useState('')
  const [height,setHeight]=useState('')
     const [weight,setWeight]=useState('')
     const [age,setAge]=useState('')
     const [gender,setGender]=useState("")
     const [goal,setGoal]=useState("")
     const [workoutDays,setWorkoutDay]=useState(3)
     const [dietPreference,setDiet]=useState("")
const userId=localStorage.getItem("token")
const {axios}=useAppContext()
  const GeneratPlanHander=async(e)=>{
e.preventDefault()
/* if(!height || !weight|| !age || !gender || !goal || !workoutDay || !diet){
  toast.error("requires all the fields")
} */
if(isLoading) return;
setIsLoading(true)
try {
  const payload={
    userId,
    name,
  height: Number(height),
  weight: Number(weight),
  age: Number(age),
  workoutDays: Number(workoutDays),
  gender,
  goal,
  dietPreference
  }
  const {data}= await axios.post("http://localhost:8080/auth/profile",payload)
  if(data.success){
    toast.success(data.message)
  
  }
  else{
    toast.error(data.message)
  }
} catch (error) {
  console.error(error)
  toast.error("server error 500")
}
    }


  const fetchProfile=async()=>{
const userToken=localStorage.getItem("token")

    try {
const {data}=await axios.post("/api/user/profile",{userId:userToken})
console.log(data)
setName(data.details.name)
setHeight(data.details.height)
setWeight(data.details.weight)
setAge(data.details.age)

setGender(data.details.gender)
setGoal(data.details.goal)
setDiet(data.details.dietPreference)
setWorkoutDay(data.details.workoutDays)

      console.log(data.name)
    } catch (error) {
      console.log(error)
    }
  }
  return (
  <div className='bg-primary/80 min-h-screen flex flex-col items-center  '>
           <div className='mt-10' >   <h3 className='text-white uppercase text-4xl font-semibold'>complete your profile</h3>
        <p className='text-gray-400 text-center'>Help us personalize your fitness jounery</p></div>
      <div  className='bg-slate-700 mt-5 shadow-gray-400 shadow-md px-2 h-[400px] w-[900px] rounded-lg '>

      <form action="" className='w-full gap-2 grid lg:grid-cols-3 mt-7 gap-2'>
       <input type='text'
       placeholder='Enter your Name'
       value={name}
       onChange={(e)=>setName(e.target.value)}
      className=' py-4 text-white bg-slate-600 bg-gray-200 
rounded-2xl px-3 placeholder:text-gray-300 outline-none my-4'
        />
         <input type="text" placeholder='Enter your height(cm)'
         value={height}
         inputMode='numeric'
         pattern='[0-9]*' 
       onChange={(e)=>{
        const value=e.target.value
        if(/^\d*$/.test(value)){
          setHeight(value)
        }

}}
className=' py-4 text-white bg-slate-600 bg-gray-200 
rounded-2xl px-3 placeholder:text-gray-300 outline-none my-4' />
    
        
       <input type="text" placeholder='Enter your Weight(kg)'
       value={weight}
         inputMode='numeric'
         pattern='[0-9]*' 
       onChange={(e)=>{
        const value=e.target.value
        if(/^\d*$/.test(value)){
          setWeight(value)
        }

       }}
className=' py-4 text-white bg-slate-600 bg-gray-200 
rounded-2xl px-3 placeholder:text-gray-300 outline-none my-4' />
    
        
        
       <input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  placeholder="Enter your age(year)"
  value={age}
  onChange={(e) => {
    const value = e.target.value;

    // Allow only digits (and empty input)
    if (/^\d*$/.test(value)) {
      setAge(value);
    }
  }}
className=' py-4 text-white bg-slate-600 bg-gray-200 
rounded-2xl px-3 placeholder:text-gray-300 outline-none my-4'
/>
       
          <div className='flex flex-col'>
          
            <select name="" id=""
            value={gender}
            onChange={(e)=>{
              setGender(e.target.value)
            }}
           className=' py-4 text-white bg-slate-600 bg-gray-200 
rounded-2xl px-3 placeholder:text-gray-300 outline-none my-4'>
              <option value=""disabled >select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
             <option value="others">Others</option>

            </select>
     
          </div>

       
        <div className='flex flex-col'>
          
            <select name="" id=""
            value={goal}
            onChange={(e)=>{
              setGoal(e.target.value)
            }}
       className=' py-4 text-white bg-slate-600 bg-gray-200 
rounded-2xl px-3 placeholder:text-gray-300 outline-none my-4'>
              <option value=""disabled  >select goal</option>
              <option value="Fat_loss">Fat Loss</option>
<option value="Muscle_gain">Muscle_gain</option>
<option value="Maintenance">Maintenance</option>
<option value="Recompostion">Recompostion</option>

            </select>
        
          </div>

                <div className='flex flex-col'>
          
            <select name="" id=""
            value={dietPreference}
            onChange={(e)=>{
              setDiet(e.target.value)
            }}
        className=' py-4 text-white bg-slate-600 bg-gray-200 
rounded-2xl px-3 placeholder:text-gray-300 outline-none my-4'>
              <option value=""disabled  >select diet</option>
       <option value="Veg">Veg</option>
<option value="Non-veg">Non-veg</option>
<option value="Vegan">Vegan</option>
<option value="Eggetarian">Eggetarian</option>

            </select>
        
          </div>
          

       
         <div className='flex flex-col  gap-3  mt-9'>  
           <div className='flex  gap-2'>
           <input
  type="range"
  min="1"
  max="7"
  value={workoutDays}
  onChange={(e) => setWorkoutDay(e.target.value)}
  className="w-32 accent-blue-500"
/>
<span className=" text-gray-300">
  {workoutDays} days/week
</span>
         </div>
 
      </div>
   
   
      </form>
         <div className='text-white flex gap-3 justify-center  mt-6'>
  <button disabled={isLoading}
  
  onClick={GeneratPlanHander}
  className='bg-blue-500 px-6 rounded-md font-medium hover:bg-blue-600 transition-all py-2'>{
    isLoading?"Updating...":"Update"
    }</button>
    <div>
      <button
      onClick={fetchProfile}
  
       className='bg-blue-500 px-6 rounded-md font-medium hover:bg-blue-600 transition-all py-2'>Edit
       
</button>
    </div>
  </div>
       </div>
   
    </div>)
  
}
