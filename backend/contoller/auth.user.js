
import { success } from "zod"
import { User } from "../db/model/userschema.js"
import { env } from "../config/zodValidate.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import cookie from "cookie-parser"
export const Signup=async(req,res)=>{
    try {
      const {username,email,password}=req.body
      if(!username || !email || !password){
        return res.json({
            success:false,
            message:"all fields are required"
        })
      }  
      const userAleadyExist=await User.findOne({email})
      if(userAleadyExist){
        return res.json({
            success:false,
            message:"user aleardy exist"
        })
      }
        const hashpass=await bcrypt.hash(password,10)
      const user=await User.create({
    username:username,
    email:email,
    password:hashpass
      })
      const jwttoken=jwt.sign({userId:user._id},env.JWT_SECRET,{expiresIn:"7d"})

    

      
      res.cookie("token",jwttoken,{
        httpOnly:true,
        secure:env.NODE_ENV==="production",
        sameSite:"strict",
        maxAge:7*24*60*60*1000
      })
    return res.status(202).json({
        success:true,
        message:"successfully signed up",
        
    })
    } catch (error) {
        console.error(error)
        return res.status(500).json("server error 500")
    }
}

export const Login=async(req,res)=>{
  try {
    const {email,password}=req.body
    if(!email||!password){
      return res.json({
        success:false,
        message:"all fields are required"
      })
    }
    const user=await User.findOne({email})
    if(!user){
      return  res.status(400).json({
        success:false,
        message:'user dosenot exist'
      })
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
      return res.json({
        success:false,
        message:"invalid password"
      })
    }
    return res.status(201).json({
      success:true,
      message:"login successfull"
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success:false,
      message:"server error at Login"
    })
  }
}
export const logout=async(req,res)=>{
  res.clearCookie("token")
  res.status(202).json({
    success:true,
    message:"logout successful"
  })
}