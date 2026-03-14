const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server đang chạy với MongoDB Atlas");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server chạy ở port ${PORT}`);
});