import mongoose from "mongoose";

const AgentMemorySchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        index:true
    },
    content:{
        type:String,
        required:true
    },
    embedding:{
        type:[Number],
        required:true
    },
    type:{
        type:String,
        enum:["preference",
            "habit",
            "feedback",
            "pain",
            "goal_update",
            "general"],
        default:"general"
    },
    importance:{
        type:Number,
        required:true,
        default:0.5
    },

},{timestamps:true})
export const AgentMemory=mongoose.model(
    "agentMemory",
    AgentMemorySchema,
    "agentMemory"
)