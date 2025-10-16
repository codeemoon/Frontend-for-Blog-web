const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

let User = mongoose.model("user", userSchema);

module.exports = User;
