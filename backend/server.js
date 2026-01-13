import "./config/boostrap.js"
import dbconnection from "./db/dbconnection.js"
import express from "express"
import cors from "cors"
import { env } from "./config/zodValidate.js"
import router from "./router/router.js"
import cookieParser from "cookie-parser"
import agentRouter from "./router/agentRouter.js"
const app=express()
app.use(cors(
  {
    origin:"http://localhost:5173",
    credentials:true
  }
))

app.use(express.json())
app.use(cookieParser()); 
app.use("/auth",router)
app.use("/api",agentRouter)


const serverStart=async()=>{
    try {
      await dbconnection()
      app.listen(env.PORT,()=>console.log(`server is running at: http://localhost:${env.PORT}`))
    /*    const searchdata = await searchMemory({
    userId: "jai123",
    query: "i am jai"
  }); */


        
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}
serverStart()