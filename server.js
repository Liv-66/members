const mongoose = require("mongoose");
const app = require("./app");

const DB =
  "mongodb+srv://Liv:F62rDr5aAVSHpryP@cluster0.a7fw9.mongodb.net/members?retryWrites=true&w=majority";

mongoose.connect(DB).then(() => console.log("連接成功：會員"));

