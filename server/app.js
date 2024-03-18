const express = require("express");
const app = express();
const cors = require("cors");
const getRouter = require("./routes/getRoutes");
const putRouter = require("./routes/putRoutes");
const postRouter = require("./routes/postRoutes");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "https://flick-picks-inky.vercel.app",
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(postRouter);
app.use(getRouter);
app.use(putRouter);

module.exports = app;
