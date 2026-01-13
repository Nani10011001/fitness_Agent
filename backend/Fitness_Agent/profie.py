import requests

NODE_PROFILE_BASe="http://localhost:8080/api"

def profile_fetch_memory(userId:str)->list:
    if not userId:
        return []
    try:
        response=requests.post(f"{NODE_PROFILE_BASe}/user/profile",json={
        "userId":userId
          },timeout=5)
        if not response.ok:
            print("no data is available")
            return []
        data=response.json()
        memories=data.get("details",{})
        #print("profile_memories: ",memories)
        result=[]
        
        result.append(f"Age: {memories.get('age')}")
        result.append(f"Gender: {memories.get('gender')}")
        result.append(f"Height: {memories.get('height')} cm")
        result.append(f"Weight: {memories.get('weight')} kg")
        result.append(f"Goal: {memories.get('goal')}")
        result.append(f"Workout days per week: {memories.get('workoutDays')}")
        result.append(f"Diet preference: {memories.get('dietPreference')}")
        print(result)
        return result
    except Exception as e:
        print("error in the profile fetch--",e)

