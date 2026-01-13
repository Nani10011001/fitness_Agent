import {pipeline} from "@xenova/transformers"


let embedded=null

 const loadEmbedder=async()=>{
    if(!embedded){
embedded=await pipeline(
    "feature-extraction",
 "Xenova/all-MiniLM-L6-v2"
)
    }
    return  embedded
}
export const embedText=async(text)=>{
    if(!text){
        throw new Error("no text is found")

    }
    const model=await loadEmbedder()
    const ouput=await model(text,{
        pooling:"mean",
        normalize:true
    })
 
 


    return Array.from(ouput.data)

}
/* const vector=await embedText("hello i am jai")
console.log(vector.slice(0,5))
console.log(vector.length) */


