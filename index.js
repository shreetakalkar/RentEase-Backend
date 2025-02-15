require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
<<<<<<< HEAD
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const roomRoutes = require("./routes/roomRoutes");
const userRoutes = require("./routes/userRoutes");
=======
const cors = require("cors");
>>>>>>> 16850fb94eeacdc1f9f5eff90a88e0a4f526c17a

const app = express();

app.use(bodyParser.json());
app.use(express.json());
<<<<<<< HEAD

app.use(
  cors({
=======
app.use(
  cors({
    // origin: "http://localhost:5173",
    // origin: "https://mastercode.netlify.app",
>>>>>>> 16850fb94eeacdc1f9f5eff90a88e0a4f526c17a
    origin: "*",
    methods: ["POST", "GET"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/", authRoutes);
app.use("/bookings", bookingRoutes);
app.use("/payments", paymentRoutes);
app.use("/reviews", reviewRoutes);
app.use("/rooms", roomRoutes);
app.use("/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server!" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
