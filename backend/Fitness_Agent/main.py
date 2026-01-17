
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langchain_groq import ChatGroq
from langchain_core.messages import (
    AIMessage,
    HumanMessage,
    BaseMessage,
    SystemMessage
)
from typing import TypedDict, Annotated, Sequence, List
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from dotenv import load_dotenv
import os

from prompt import build_system_prompt_fitnessAgent
from memory import fecth_semantic_memory
from profie import profile_fetch_memory
from user_preference import extract_user_perference

load_dotenv()


class AgentState(TypedDict):
    messages:Annotated[Sequence[BaseMessage],add_messages]
    memories:List[str]
    userId:str
    tempMessage:List[str]

llm=ChatGroq(model_name="llama-3.1-8b-instant",api_key=os.getenv("GROQ_API_KEY"),streaming=True)

# validation of state
def validate_state(state:AgentState,node_name:str):
    if "messages" not in state or not  isinstance(state["messages"],List):
        raise ValueError(f"{node_name} invalid state ")
    if "userId" not in state or not isinstance(state["userId"],str):
        raise ValueError(f"{node_name} userId is invalid type")
    if "memories" not in state or not isinstance(state["memories"],List):
        raise ValueError(f"memories schema structure invalid")
    if "tempMessage" not in state or not isinstance(state["tempMessage"],List):
        raise ValueError(f"{node_name} tempMessage type is not valid")
    return state
def AgentMemory(state:AgentState):
    validate_state(state,"AgentMemory")
    userId=state["userId"]
    user_message=state["messages"][-1].content
    profile_lines_data=profile_fetch_memory(userId=userId)
    semantic_memory=fecth_semantic_memory(user_id=userId,query=user_message)
    return{"memories":profile_lines_data+semantic_memory}

def FitnessAgent(state:AgentState):
    validate_state(state,"FitnessAgent")
    profile_lines=state.get("memories", [])or []
    
    full_system_prompt=build_system_prompt_fitnessAgent(profile_lines=profile_lines) 
    full_message=[SystemMessage(content=full_system_prompt),*state["messages"]]
    result=llm.invoke(full_message) 
    return {"messages":[result]}
graph=StateGraph(AgentState)
graph.add_node("Memory",AgentMemory)
graph.add_node("fitnessAgent",FitnessAgent)
graph.add_edge(START,"Memory")
graph.add_edge("Memory","fitnessAgent")
graph.add_edge("fitnessAgent",END)

app=graph.compile()
result=app.invoke({"userId":"696b46300497e58e9c590502",
            "memories":[],
            "messages":[HumanMessage(content="help me build weekly excercise of 5 days")],
            "tempMessage":[]})
print(result["messages"][-1].content)

appFastApi=FastAPI()
@appFastApi.post("/chat/agent")


