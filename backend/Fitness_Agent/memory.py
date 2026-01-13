import requests
NODE_BASE_URL="http://localhost:8080/api"

def fecth_semantic_memory(user_id:str,query:str,limit:int=5)->list[str]:
    if not user_id or not query:
        return []
    try:
        response=requests.post(f"{NODE_BASE_URL}/memory/search",json={
            "userId":user_id,
            "query":query,
            "limit":limit

        },timeout=5)
        if not response.ok:
            return []
        data=response.json()
        memories=data.get("mem",[])
        print("memory: --->",memories)
        result=[]
        
        for m in memories:
            if "content" in m:

                result.append(m["content"])
        return result
      
    except Exception as e:
        print("Memory fecthing is failed error: ",e)
        return []
