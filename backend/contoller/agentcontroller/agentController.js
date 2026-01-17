import { pythonDataSender } from "../../connection_py/connector_py.js";
import { AgentMemory } from "../../db/model/AgentMemory.js";
import { embedText } from "../../MemConfig/embedding.js";
import { scoreImportance } from "../../MemConfig/importanceCheck.js";
export const agentController = async (req, res) => {
  const { userId, content } = req.body

  // validate 
  if (!userId || !content) {
    res.status(400).end("Missing userId or content "+"register before using it and complete profile")
    return
  }
  
  console.log(`[agentController] Received: userId=${userId}, content=${content}`)
  
  try {
    const queryEmbedding=await embedText(content)
    const types=scoreImportance(content)
    const ImportanceMap={
      preference:0.9,
      habit:0.7,
      feedback:0.6,
      pain:0.6,
      goal_update:0.95,
      general:0.2,
      emotion:0.6
    }
    if(ImportanceMap[types] < 0.3) {
      console.log(`[agentController] Importance too low: ${types} (${ImportanceMap[types]})`)
      return
    }
    
    //Agent memory store
    const AgentMem=await AgentMemory.create({
      userId:userId,
      content:content,
      embedding:queryEmbedding,
      type:types,
      importance:ImportanceMap[types]
    })

    //  streaming headers
    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")
    res.flushHeaders?.()

    console.log(`[agentController] Starting stream...`)
    for await (const chunk of pythonDataSender({ userId, content })) {
      console.log(userId,content,"python data")
      console.log(`[agentController] Writing chunk:`, chunk)
      res.write(chunk);
    }

    console.log(`[agentController] Stream complete`)
    res.end()
  } catch (error) {
    console.error("[agentController] Error:", error)
    res.write(`\n[ERROR] ${error.message}`)
    res.end()
  }
};
