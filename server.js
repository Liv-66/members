const mongoose = require("mongoose");
const app = require("./app");

const DB =
  "mongodb+srv://Liv:F62rDr5aAVSHpryP@cluster0.a7fw9.mongodb.net/members?retryWrites=true&w=majority";

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("連接成功：會員"));

const server = app.listen(8000, "127.0.0.1", () => {
  console.log(`from port: 8000`);
});
