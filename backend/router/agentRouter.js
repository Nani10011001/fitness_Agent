import express from "express"
import { agentController } from "../contoller/agentcontroller/agentController.js"
import { profileFectch } from "../contoller/profile.fetch.js"
const agentRouter=express.Router()
agentRouter.post("/send",agentController)
agentRouter.post("/user/profile",profileFectch)
export default agentRouter