const express = require("express");
const cors = require("cors");
const { aiRouter } = require("./routes.js");

const dotenv = require("dotenv");
dotenv.config();

process.env.PORT = 3000;
if (!process.env.PORT) {
  process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10);
const app = express();

const frontendOrigin = "http://localhost:5174";
app.use(cors({ origin: frontendOrigin }));

// app.use(cors());
app.use(express.json());

app.use("/", aiRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});