const { OpenAI } = require('openai');

const client = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'ollama',
});

async function createChatCompletion(prompt) {
    const response = await client.chat.completions.create({
        model: "deepseek-r1:1.5b",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
    });

    return response.choices[0].message.content.trim();
}

async function createStreamChatCompletion(prompt) {
    try {
      const response = await client.chat.completions.create({
        model: "deepseek-r1:1.5b",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        stream: true,
    }, { responseType: 'stream' });
    
    return response;
    } catch (error) {
      console.error('createStreamChatCompletion error: ', error);
    }
}

module.exports = { createChatCompletion, createStreamChatCompletion };

