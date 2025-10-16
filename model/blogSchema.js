const moongoose = require("mongoose");

const blogSchema = new moongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  draft: {
    type: Boolean,
    default: false, //for private it become true
  },
  
   }, 
    {timestamps : true}
);

let Blog = moongoose.model("Blog", blogSchema);

module.exports = Blog;
