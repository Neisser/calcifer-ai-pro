const express = require("express");
const cors = require("cors");
const app = express();
const port = 3009;

app.use(cors());

const {
  createChatCompletion,
  createStreamChatCompletion,
} = require("./openai");
const { formatStream } = require("./event");

app.get("/chat", async (req, res) => {
  try {
    const { message } = req.query;

    console.log("message: ", message);

    const response = await createChatCompletion(message);

    res.send(response).status(200);
  } catch (error) {
    console.error("error: ", error);

    res.status(500).json({message: error.message});
  }
});

app.get("/stream-chat", async (req, res) => {
  try {
    const { message } = req.query;

    console.log("message: ", message);

    const stream = await createStreamChatCompletion(message);

    // Set headers for Server-Sent Events
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of stream) {
      try {
        const content = chunk.choices[0]?.delta?.content || "";

        res.write(formatStream(content));
      } catch (error) {
        console.error("error: ", error);

        res.status(500).send(error);
      }
    }

    res.end();
  } catch (error) {
    console.error("error: ", error);

    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
