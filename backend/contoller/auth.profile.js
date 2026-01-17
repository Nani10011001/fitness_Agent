
import { success } from "zod"
import { fitnessProfile } from "../db/model/fitnessProfile.js"

export const auth_profile=async(req,res)=>{
    try {
        const userId=req.userId
      
        let {name,height,weight,age,gender,goal,workoutDays,dietPreference}=req.body

     if(!name||! height|| !weight|| !age || !gender || !goal || !workoutDays || !dietPreference)
        {

    return res.status(400).json({
        success:false,
        message:"all fields are required"
    })


}
    if(name<3&&name>20)
        {
        return res.json({
            success:false,
            message:"Name is too long or too low"
        })
    }
if(height<=50){
    return res.status(400).json({
        success:false,
        message:"height is to low"
    })
}
if(weight<=20){
    return res.status(400).json({
        success:false,
        message:"weight is to low"
    })

}
if(age<=2){
    return res.status(400).json({
        success:false,
        message:"age is to low"
    })
}
const profile=await fitnessProfile.create({
    userId:userId,
    name,
    height:height,
    weight:weight,
    age:age,
    gender:gender,
    goal:goal,
    workoutDays:workoutDays,
    dietPreference:dietPreference

})
return res.status(202).json({
    success:true,
    message:"your profile created successfully",
    profileDetails:profile
})

    } catch (error) {
        console.error(" :",error)
       return res.status(500).json({
            success:false,
            message:"server error 500"
        })
    }
}