

import { fitnessProfile } from "../db/model/fitnessProfile.js"

export const profileFectch=async(req,res)=>{
    const {userId}=req.body
    
    try {

        if(!userId){
       return res.status(300).json({
            success:false,
            message:" profile not yet created"
        })
    }
 const userpersonal=await fitnessProfile.findOne({userId})
 if(!userpersonal){
    return res.status(300).json({
        success:"false",
        message:"invalid user"
    })
 }
  console.log(userpersonal)
return res.status(200).json({
    success:true,
    message:"data fetched succesfully",
    details:userpersonal
 })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"server error",
            
        })
    }

}