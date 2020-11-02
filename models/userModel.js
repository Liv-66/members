const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "尚未提供",
  },
  password: String,
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "E-mail格式錯誤"],
    default: "尚未提供",
  },
  phone: {
    type: String,
    default: "尚未提供",
  },
  address: {
    type: String,
    default: "尚未提供",
  },
  job: {
    type: String,
    default: "尚未提供",
  },
  education: {
    type: String,
    default: "尚未提供",
  },
  signIn: Date,
  signOut: Date,
  totalHour: Number,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
