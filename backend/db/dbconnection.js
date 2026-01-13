import mongoose from "mongoose";
import { env } from "../config/zodValidate.js";
const dbconnection=async()=>{
    try {
        await mongoose.connect(env.MONGO_URL)
        console.log("db connection is sucessfully")
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}
export default dbconnection