const { config } = require("dotenv");
config()

const { Configuration, OpenAIApi } = require("openai");
const readline = require("readline");

const openai = new OpenAIApi(new Configuration ({
  apiKey: process.env.API_KEY
}))

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// userInterface.prompt()
// userInterface.on("line", async input => {
//   const res = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: input }],
//   })
//   console.log(res.data.choices[0].message.content)
//   userInterface.prompt()
// })

userInterface.question("Hello, friend! What would you like me to help you with today? ", async (input) => {
  const prompt = `Pretend you are my tutor. I'm having trouble with ${input}. Do not give me the answer or tell me how to get the answer. Instead, explain the basic concept that will help me solve it on my own.`;
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens: 200,
    messages:[
      {"role": "system", "content": prompt}
    ]
  });
  console.log("data----", res.data)
  console.log("answer:", res.data.choices[0].message.content);
  userInterface.close();
});