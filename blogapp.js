const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./config/dbConnect");
const User = require("./model/userSchema");
const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");

app.use(express.json());
app.use(cors());

app.use("/api/v1", userRoute);
app.use("/api/v1", blogRoute);

app.listen(3020, () => {
  console.log("Server activated");
  dbConnect();
});
