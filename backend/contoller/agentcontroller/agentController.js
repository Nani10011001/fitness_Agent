import { pythonDataSender } from "../../connection_py/connector_py.js";

export const agentController = async (req, res) => {
  const { userId, content } = req.body

  // validate 
  if (!userId || !content) {
    res.status(400).end("Missing userId or content")
    return
  }

  //  streaming headers
  res.setHeader("Content-Type", "text/event-stream")
  res.setHeader("Cache-Control", "no-cache")
  res.setHeader("Connection", "keep-alive")
  res.flushHeaders?.()

  try {
    for await (const chunk of pythonDataSender({ userId, content })) {
      res.write(chunk);
      console.log("STREAM:", chunk)
    }

    res.end()
  } catch (error) {
    console.error(error)
    res.write("\n[ERROR]")
    res.end()
  }
};
