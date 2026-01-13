
import {env} from "../config/zodValidate.js"
export async function* pythonDataSender({ userId, content }) {
  const res = await fetch(env.FAST_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId,content}),
  });

  if (!res.body) {
    throw new Error("No response body from FastAPI");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    console.log(value)
    yield decoder.decode(value,{stream:true});
    
  }
}
