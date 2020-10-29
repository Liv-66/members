const express = require("express");
const userRouter = require("./routes/userRouter");

const app = express();
app.set("view engine", "hbs");

app.use("/users", userRouter);

module.exports = app;
