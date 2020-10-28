const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: String,
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "E-mail格式錯誤"],
  },
  phone: String,
  address: String,
  job: String,
  education: String,
  signIn: Date,
  signOut: Date,
  totalHour: Number,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
