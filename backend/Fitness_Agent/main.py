from langgraph.graph import StateGraph,START,END
from langchain_groq import ChatGroq
from langgraph.graph.message import add_messages
from langchain_core.messages import (ToolMessage,
                                     AIMessage,
                                     HumanMessage,
                                     BaseMessage,
                                     SystemMessage)
from typing import TypedDict,Annotated,Sequence,List
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
import  time
import os
from prompt import build_system_prompt_fitnessAgent
from memory import fecth_semantic_memory
from profie import profile_fetch_memory
load_dotenv()

class Agent_state(TypedDict):
    messages:Annotated[Sequence[BaseMessage],add_messages]
    userId:str
    memories:List[str]

class chatRequest(BaseModel):
    userId:str
    content:str

#memory fetch node make sure the data is fetched correct without any error thing
def MemoryNode(state:Agent_state):
    user_id=state["userId"]
    user_message=state["messages"][-1].content #user message thing
    #semantic memory
    semantic_memories=fecth_semantic_memory(user_id,user_message)
    user_profile_memories=profile_fetch_memory(user_id)
    all_memories=[]
    if semantic_memories:
        all_memories.extend(semantic_memories)
    if user_profile_memories:
        all_memories.extend(user_profile_memories)
    return {"memories":all_memories}




llm =ChatGroq(model_name="llama-3.1-8b-instant",
              api_key=os.getenv("GROQ_API_KEY"),streaming=True)

""" result=llm.invoke('how can you help me ')
print(result.content) """

""" #agent node 
def AgentNode(state:Agent_state):
    fullmessage=[system_prompt]+state["messages"]
    result=llm.invoke(fullmessage)
    response=AIMessage(content=result.content)
    return {"messages":state["messages"]+[response]} """
#agent node
def AgentNode(state:Agent_state):
    profile_lines=state.get("memories",[])
    fitness_prompt=build_system_prompt_fitnessAgent(profile_lines)
    full_fitness_system_prompt=SystemMessage(content=fitness_prompt)
    message=[full_fitness_system_prompt]+state["messages"]
    result=llm.invoke(message)
    response=AIMessage(content=result.content)
    return {"messages":state["messages"]+[response]}

graph=StateGraph(Agent_state)
graph.add_node("Memory",MemoryNode)
graph.add_node("fitnessAgent",AgentNode)
graph.add_edge(START,"Memory")
graph.add_edge("Memory","fitnessAgent")
graph.add_edge("fitnessAgent",END)
graph_build=graph.compile()
app=FastAPI()

def stream_llm_response(userId:str,content:str):
    intial_message_state={
        "userId":userId,
        "messages":[HumanMessage(content=content)],
        "memories":[]
    }
    result_message=graph.invoke(intial_message_state)
    final_message=result_message["messages"][-1].content
    for chunk in final_message.split():
        yield chunk+" "
        time.sleep(0.03)


@app.post("/chat/api")
async def chat_stream(req: chatRequest):
    return StreamingResponse(
        stream_llm_response(req.userId, req.content),
        media_type="text/plain"
    )
