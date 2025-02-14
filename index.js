require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    // origin: "http://localhost:5173",
    // origin: "https://mastercode.netlify.app",
    origin: "*",
    methods: ["POST", "GET"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(authRoutes);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
