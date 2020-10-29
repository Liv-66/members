const path = require("path");
const express = require("express");
const userRouter = require("./routes/userRouter");

const app = express();
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userRouter);

module.exports = app;
