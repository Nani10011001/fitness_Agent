import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
const filename=fileURLToPath(import.meta.url)
const directorname=path.dirname(filename)

dotenv.config({
    path:path.resolve(directorname,"../.env")
})
//port 
if(!process.env.PORT){
    console.log("----PORT is not loaded in it----")
    
}
//Mongo_url
if(!process.env.MONGO_URL){
    console.log("---MONGO_URL is undefined---")
}
//jwt secret
if(!process.env.JWT_SECRET){
    console.log("---JWT_SECRET is undefined---")
}
// node_env
if(!process.env.NODE_ENV){
    console.log("---NODE_ENV is undefined---")
}
if(!process.env.FAST_API_URL){
    console.log("---FAST_API is undefined---")
}
if(!process.env.GROQ_API_KEY){
    console.log("---groq api is undfined---")
}