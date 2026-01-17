
import {env} from "../config/zodValidate.js"
export async function* pythonDataSender({ userId, content }) {
  try {
    console.log(`[pythonDataSender] Calling ${env.FAST_API_URL} with userId: ${userId}`)
    const res = await fetch(env.FAST_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, content }),
    });

    console.log(`[pythonDataSender] Response status: ${res.status}`)
    
    if (!res.ok) {
      throw new Error(`FastAPI returned ${res.status}: ${await res.text()}`);
    }

    if (!res.body) {
      throw new Error("No response body from FastAPI");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        console.log("[pythonDataSender] Stream ended")
        break;
      }
      const decoded = decoder.decode(value, { stream: true });
      console.log("[pythonDataSender] Chunk:", decoded)
      yield decoded;
    }
  } catch (error) {
    console.error("[pythonDataSender] Error:", error)
    throw error;
  }
}

