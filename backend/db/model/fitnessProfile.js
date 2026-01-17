import mongoose from "mongoose";


const profileSchema=new mongoose.Schema({
    userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Userauth",
require:true,
unique:true
    },
    name:{
type:String,
required:true,
min:3,
max:20
    },
    height:{
        type:Number,
        required:true,
        min:[50,"height is to small"],
        max:[250,"height is to large"]
    },
    weight:{
type:Number,
required:true,
min:[20,"weight to low"],
max:[1000,"weight to high"]
    },
    age:{
        type:Number,
        required:true,
        min:[2,"age is to low"],
        max:[150,"age is too high"]
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female","others"]
        
    },
    goal:{
        type:String,
        required:true,
       enum: ["Fat_loss", "Muscle_gain", "Maintenance", "Recomposition"]
  
    },
    workoutDays:{
        type:Number,
        min:1,
        max:6
    },
    dietPreference:{
        type:String,
         enum:["Veg","Non-veg","Vegan","Eggetarian"]
    
    },
    
},{
    timestamps:true,
    collection:"fitnessprofiles"
}
    
)
export const fitnessProfile=mongoose.model("fitnessProfile",profileSchema)