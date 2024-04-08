const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoute");
const movieRouter = require("./routes/movieRoute");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "https://flickpicks-hub.vercel.app",
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(authRouter);
app.use(userRouter);
app.use(movieRouter);

module.exports = app;
