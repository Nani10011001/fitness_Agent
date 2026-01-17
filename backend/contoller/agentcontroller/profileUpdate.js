import mongoose from "mongoose"
import { fitnessProfile } from "../../db/model/fitnessProfile.js"

export const profileUpdate=async(req,res)=>{

    const {userId,name,height,weight,age,gender,goal,dietPreference,workoutDays}=req.body
    
    try {
 
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"invalid user id"
            })
          

        }
      
      const updateFields = {}

if (name !== undefined) updateFields.name = name.trim()
if (height !== undefined) updateFields.height = height
if (weight !== undefined) updateFields.weight = weight
if (age !== undefined) updateFields.age = age
if (gender !== undefined) updateFields.gender = gender
if (goal !== undefined) updateFields.goal = goal
if (dietPreference !== undefined) updateFields.dietPreference = dietPreference
if (workoutDays !== undefined) updateFields.workoutDays = workoutDays

      
      const ProfileUpdate= await fitnessProfile.findOneAndUpdate(
  {userId:new mongoose.Types.ObjectId(userId) },   
  { $set:updateFields },
  { new: true,
   
     runValidators: true,  
    context: "query"    
   }
)

        

          if(!ProfileUpdate){
            return res.status(400).json({
                success:false,
                message:"unable to update the profile"
            })
          } 
          return res.status(200).json({
            success:true,
            message:"profile updated successfully",
            info:ProfileUpdate
          })
       


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"error in the profile updating",
            errorMessage:error.message
        })
    }
}