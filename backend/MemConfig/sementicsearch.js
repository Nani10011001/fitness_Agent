import { AgentMemory } from "../db/model/AgentMemory.js";
import { embedText } from "./embedding.js";

export const searchMemory = async ({
  userId,
  query,
  limit = 5
}) => {
  const queryEmbedding = await embedText(query);
 userId = userId.trim().toLowerCase();
  return AgentMemory.aggregate([
  {
    $vectorSearch: {
      index: "fitness_agent_mem",
      path: "embedding",
      queryVector: queryEmbedding,
      numCandidates: 100,
      limit,
      filter: { userId }
    }
  },
  {
    $addFields: {
      finalScore: {
        $multiply: ["$importance", { $meta: "vectorSearchScore" }]
      }
    }
  },
  {
    $project: {
      content: 1,
      importance: 1,
      finalScore: 1
    }
  },
  {
    $sort: { finalScore: -1 }
  }
])

}

 


