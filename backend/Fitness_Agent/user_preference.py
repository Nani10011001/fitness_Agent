

def extract_user_perference(text:str)->list[str]:
    text=text.lower()
    user_temp_perference=[]
    patterns=[
     
        "i feel like",
        "i enjoy",
        "i'm in the mood for"
    ]
    for p in patterns:
        if p in text:
            user_temp_perference.append(text)
    return user_temp_perference