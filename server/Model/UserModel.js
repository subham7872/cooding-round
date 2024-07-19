const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { type: String },
  email: { type: String },
  mobile: { type: Number },
  password: { type: String },
});

const userModel = mongoose.model("user", userSchema, "users");

module.exports = userModel;
