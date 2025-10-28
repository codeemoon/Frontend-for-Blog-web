const Blog = require("../model/blogSchema")
const Comment = require("../model/commentSchema")
const User = require("../model/userSchema")


async function commentBlog (req , res) {
  const creator = req.user
  const {id} = req.params
  const {comment} = req.body

  try {

      if(!comment){
        return res.status(400).json({
          success : fail,
          message : "Please enter comment"
        })
      }


        const findblog = await Blog.findById(id)
        if(findblog==null){
          return res.status(400).json({
          success : false,
          message : "No blogs found"
        })
      }

      const newComment = await Comment.create({ comment , blog : id , user: creator })

     const cmnt =   await Blog.findByIdAndUpdate(id, {$push : {comments : newComment._id}})
      return res.status(200).json({
        success : true ,
        message : "Commented",
        cmnt
      })


  } catch (error) {
     return res.status(500).json({
      success : false,
       message : "Error Found",
       err : error.message
    })
    
  }


}
async function deletecommentBlog (req , res) {
  const userId = req.user
  const {id} = req.params
  try {
        const findcomment = await Comment.findById(id).populate({
          path : "blog",
          select : "creator"
        })

        // console.log(findcomment , findcomment.user !== userId , userId , findcomment.blog.creator , findcomment.user);

        if(!findcomment){
          return res.status(400).json({
          success : false,
          message : "No comments found"
        })
      }
      if (findcomment.user != userId && findcomment.blog.creator != userId){
          return res.status(400).json({
          success : false,
          message : "Not Authorized"
      })       
     }

     await Blog.findByIdAndUpdate(findcomment.blog._id , {$pull : {comments : id}})
     await Comment.findByIdAndDelete(id)

      return res.status(200).json({
        success : true ,
        message : "Comment deleted",
        
      })
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIyIiwiaWQiOiI2OGZlNDZkNjVhOGNiMzU5OTMxNTM0NzQiLCJpYXQiOjE3NjE0OTQ3NTJ9.3bXqypNe6tTIG8rvdgJmhnZWtuUD4huNiYqiuW0qHQE
// user - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxIiwiaWQiOiI2OGZlNDYwNDVhOGNiMzU5OTMxNTM0NjYiLCJpYXQiOjE3NjE1Njk1MDZ9.VfnBSWVSnII1nTyUI4QD_wb0R1bebbE0S7LebuVPnpg

  } catch (error) {
     return res.status(500).json({
      success : false,
       message : "Error Found",
       err : error.message
    })
    
  }


}
async function editcommentBlog (req , res) {
  const userId = req.user
  const {id} = req.params
  const {editedComment} = req.body

  try {

    const comment = await Comment.findById(id)

    if(!comment){
     return res.status(400).json({
        success : false, 
        message : "Comment not found"
      })
    }
    // console.log(comment.user._id != creator);
    // console.log(creator);
    if(comment.user._id != userId){
      return res.status(400).json({
        success : false ,
        message : "You are not autorized"
      })

    }
      const newComment = await Comment.findByIdAndUpdate(id, {comment : editedComment}, {new : true})
    console.log(newComment);
     
      return res.status(200).json({
        success : true ,
        message : "Comment updated successfully",
        
      })


  } catch (error) {
     return res.status(500).json({
      success : false,
       message : "Error Found",
       err : error.message
    })
    
  }


}
async function likecommentBlog (req , res){
  const userId = req.user
  const {id} = req.params
   
  const getComment = await Comment.findById(id)
  
  if(!getComment.likes.includes(userId)){
    await Comment.findByIdAndUpdate(id , {$push : {likes : userId}})
    return res.status(200).json({
      success : true,
      message : "Comment liked"
    })
  }else{
    await Comment.findByIdAndUpdate(id , {$pull : {likes : userId}})
    return  res.status(200).json({
      success: true,
      message : "comment disliked"
    })
  }
  
 
  
  
}

module.exports = {commentBlog , deletecommentBlog , editcommentBlog , likecommentBlog}
