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
load_dotenv()

class Agent_state(TypedDict):
    messages:Annotated[Sequence[HumanMessage],add_messages]
    userId:str

class chatRequest(BaseModel):
    userId:str
    content:str


# llm initialization thing
system_prompt = SystemMessage(content="""
You are an intelligent AI assistant. 
- Always answer clearly and helpfully based on the user's needs.
- Enhance your responses by adding relevant emojis that match the tone or subject.
""")


llm =ChatGroq(model_name="llama-3.1-8b-instant",
              api_key=os.getenv("GROQ_API_KEY"),streaming=True)
""" result=llm.invoke('how can you help me ')
print(result.content) """

#agent node 
def AgentNode(state:Agent_state):
    fullmessage=[system_prompt]+state["messages"]
    result=llm.invoke(fullmessage)
    response=AIMessage(content=result.content)
    return {"messages":state["messages"]+[response]}
app=StateGraph(Agent_state)
app.add_node("agent",AgentNode)
app.add_edge(START,"agent")
app.add_edge("agent",END)
graph=app.compile()
app=FastAPI()

def stream_llm_response(userId:str,content:str):
    messages=[system_prompt,HumanMessage(content=content)]
    for chunk in llm.stream(messages):
        if chunk.content:
            yield chunk.content
            time.sleep(0.03)


@app.post("/chat/api")
async def chat_stream(req: chatRequest):
    return StreamingResponse(
        stream_llm_response(req.userId, req.content),
        media_type="text/plain"
    )
