const moongoose = require("mongoose");

const likeSchema = new moongoose.Schema({
    
    blog : {
        type : moongoose.Schema.Types.ObjectId,
        ref : "Blog"
    },

    user : {
        type : moongoose.Schema.Types.ObjectId,
        ref : "User"
    }


   },
   {timestamps : true}
);

let Like = moongoose.model("Blog", likeSchema);

module.exports = Like;
