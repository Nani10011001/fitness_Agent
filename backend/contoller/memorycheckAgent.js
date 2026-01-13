import { success } from "zod";
import { AgentMemory } from "../db/model/AgentMemory.js";
import { embedText } from "../MemConfig/embedding.js";

export const agentcontroller=async(req,res)=>{
  const {userId,content,type,importance}=req.body
    try {
        
       const embeddedText=await embedText(content)
        const agentMemory=await AgentMemory.create(
            {
                userId:userId,
                content:content,
                embedding:embeddedText,


                type:type,
                importance:importance
            }
        )

console.log("successfully crated")
return res.status(202).json({
    success:true,
    message:"agent memory crated successfully",
    mem:agentMemory

})
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success:false,
            message:"error at agent memory"
        })
    }
}
