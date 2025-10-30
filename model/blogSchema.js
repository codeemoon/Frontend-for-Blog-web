const { default: mongoose } = require("mongoose");
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
  image : {
    type : String,
    required : true,
  },
  imageId : {
    type : String,
    required : true,
  },
  draft: {
    type: Boolean,
    default: false, //for private it become true
  },
  creator : {
    type : moongoose.Schema.Types.ObjectId,
    ref : "User",
  },
  likes : [
    {
      type : moongoose.Schema.Types.ObjectId,
      ref : "User"
    }
  ],
  comments : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Comment"
    }
  ]
  
   }, 
    {timestamps : true}
);

let Blog = moongoose.model("Blog", blogSchema);

module.exports = Blog;
