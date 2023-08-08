const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

console.log("API Key:", process.env.API_KEY);

const openai = new OpenAIApi(new Configuration({
  apiKey: apiKey,
}));

async function getReply(input) {
  const prompt = `Pretend you are my tutor. I'm having trouble with ${input}. Do not give me the answer or tell me how to get the answer. Instead, explain the basic concept that will help me solve it on my own.`;
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens: 200,
    messages:[
      {"role": "system", "content": prompt}
    ]
  });
  return res.data.choices[0].message.content;
}

module.exports = { getReply };