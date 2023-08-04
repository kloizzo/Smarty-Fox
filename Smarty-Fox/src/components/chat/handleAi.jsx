import { Configuration, OpenAIApi } from "openai";
import { config } from "dotenv"
config()

const apiKey = process.env.API_KEY;

const openai = new OpenAIApi(new Configuration({
  apiKey: apiKey,
}));

export async function handleAIReply(input) {
  const prompt = `Pretend you are my tutor. I'm having trouble with ${input}. Do not give me the answer. Instead, explain the basic concept that will help me solve it on my own. Explain it to me like I am a kid. Sound friendly.`;
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens: 200,
    messages:[
      {"role": "system", "content": prompt}
    ]
  });
  return res.data.choices[0].message.content;
}