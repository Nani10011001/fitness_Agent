import {string, z} from "zod"

const envSchema=z.object({
    PORT:z.string().regex(/^\d+$/, "Port must be numeric"),
    MONGO_URL:z.string().min(1,"MONGO_URL must be a string"),
    JWT_SECRET:z.string().min(29,"JWT SECRET character should be 29"),
    NODE_ENV:z.string().min(1,"NODE_ENV must be string"),
    FAST_API_URL:z.string().min(1," FAST_API_URL is must be string"),
    GROQ_API_KEY:z.string().min(1,"groq api musted a string ")
    })
const parseSchema=envSchema.safeParse(process.env)

if(!parseSchema.success){
    console.log("inValid environment variable")
    parseSchema.error.issues.forEach((err)=>{
        console.log(`${err.path.join(".")}:`,err.message)
    })
    process.exit(1)
}
export const env=parseSchema.data