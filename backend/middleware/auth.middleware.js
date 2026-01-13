import jwt from  "jsonwebtoken"

import { env } from "../config/zodValidate.js"

export const authMiddleware=async(req,res,next)=>{
    const token=req.cookies?.token
    console.log("Cookies:", req.cookies);

    if(!token){
        return res.status(400).json({
            success:false,
            message:"no token provided"
        })
    }
    try {
        const decode=jwt.verify(token,env.JWT_SECRET)
        if(!decode){
            return res.status(400).json({
                success:false,
                message:"invalid token or token is expired"
            })
        }
        req.userId=decode.userId
        next()
      
        
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"server error at verification token"
        })
    }
}