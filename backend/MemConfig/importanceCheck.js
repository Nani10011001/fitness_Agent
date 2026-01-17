
export const scoreImportance=(text)=>{
    const t=text.toLowerCase()

    if(t.includes("i prefer")||t.includes("my favorate is")|| t.includes("i always") || t.includes("rembers that")){
        return "preference"
    }
    if(t.includes("i feel")|| t.includes("i am sad") || t.includes("i am  tired") || t.includes("i am Angery")){
        return "emotion"
    }
    if(t.includes("i want to change my goal")|| t.includes("i want to change diet") || t.includes("i am update the goal or diet")){
        return "goal_update"
    }
    if(t.includes("too hard") || t.includes(" too easy")|| t.includes(" challenging workout"),t.includes("i didn't like"))
    {
        return "feedback"
    }
    if(t.includes("i have pain"),t.includes("paining in my kness shoulder arms  legs")){
        return "pain"
    }
    return "general"
}