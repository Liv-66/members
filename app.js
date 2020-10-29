const path = require("path");
const express = require("express");
const cookieParser = require('cookie-parser');
const session = require("express-session");
const bodyParser = require('body-parser');
const usePassport = require("./utils/passport");
const userRouter = require("./routes/userRouter");

const app = express();
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));


app.use(
  session({
    secret: "twcpa-members",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
);
// app.use(cookieParser());

usePassport(app);

app.use("/users", userRouter);

module.exports = app;
