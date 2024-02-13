const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/userRoute.js");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST"],
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(router);

module.exports = app;
