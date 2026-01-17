import express from "express"
import { agentController } from "../contoller/agentcontroller/agentController.js"
import { profileFectch } from "../contoller/profile.fetch.js"
import { memorySearching_db } from "../contoller/agentcontroller/Memory.search.db.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { profileUpdate } from "../contoller/agentcontroller/profileUpdate.js"
const agentRouter=express.Router()
agentRouter.post("/send",agentController)
agentRouter.post("/user/profile",profileFectch)
agentRouter.post("/memory/search",memorySearching_db)
agentRouter.put("/profile/update",profileUpdate)
export default agentRouter