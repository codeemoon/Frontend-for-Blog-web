const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  Blogs : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Blog"
    }
  ]
});

let User = mongoose.model("User", userSchema);

module.exports = User;
