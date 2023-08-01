const express = require("express");
const { getReply } = require('./controllers.js');

const aiRouter = express.Router();

aiRouter.post("/getReply", async (req, res) => {
  const userInput = req.body.input;
  try {
    const aiResponse = await getReply(userInput);
    res.send(aiResponse);
  } catch (error) {
    console.error("Error requesting AI response:", error);
    res.status(500).send("Oops! Something went wrong.");
  }
});

module.exports = { aiRouter };