let mongoose = require("mongoose");

async function dbConnect() {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/blogsDatabase");
    console.log("Database conected");
  } catch (error) {
    console.log("Error while connecting database");
  }
}

module.exports = dbConnect;
