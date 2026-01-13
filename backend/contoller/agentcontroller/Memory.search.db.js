import { success } from "zod"
import { searchMemory } from "../../MemConfig/sementicsearch.js"

export const memorySearching_db=async(req,res)=>{
    const {userId,query,limit=5}=req.body
    try {
        if(!userId || !query){
     return res.json({
        message:"query and the userId is required"
     })
        }
const Memory= await searchMemory({userId,query,limit})
res.json({
    success:true,
    mem:Memory.map((m)=>m.content)
})

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"error in the search_memory"
        })
    }
}