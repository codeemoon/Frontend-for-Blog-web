const Blog = require("../model/blogSchema");
const Comment = require("../model/commentSchema");
const User = require("../model/userSchema");


async function createBlog(req, res) {
  
  try {
    const creator  = req.user

    const { title, description, draft  } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title reqired",
      });
    }
    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Description reqired",
      });
    }

    let findUser = await User.findById(creator)
    
    if(!findUser){
     return res.status(404).json({
        success : fail,
        message : "Inavild User",
      })
    }
     
   

    let blogPosted = await Blog.create({ title, description, draft , creator });

     await User.findByIdAndUpdate(creator , {$push : {Blogs : blogPosted.
      _id}})

    return res.status(200).json({
      success: true,
      message: "Blog posted",
      blogPosted,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Blog Failed",
      err: error.message,
    });
  }
}

async function getBlogs(req, res) {
  try {
    let blogs = await Blog.find({draft:false})
    .populate({
      path : "creator",
      select : "-password"  
    })
    .populate({
      path : "likes",
      select : "name email"
    })
    return res.status(200).json({
      success: true,
      message: "Blogs",
      blogs,
    });
  } catch (error) {
    return res.status(404).json({
      success: "false",
      message: "Could not found Blogs",
      err: error.message,
    });
  }
}
async function getBlog( req , res) {
  let { id } = req.params;
  try {
    let blogById = await Blog.findById(id)
    .populate({
      path : 'comments',
      populate :{
        path : "user",
        select : "name email"
      }
      
    })
    return res.status(200).json({
      success: true,
      message: "Found Blog",
      blogById
    });
  } catch (error) {
    return  res.status(404).json({
    success : false ,
    message : "Not valid ",
    err : error.message
    })
  }
}

async function updateBlog(req , res ) {
    const creator = req.user
    const {id} = req.params
    const {title , description , draft} = req.body
    try {
      if(!title && !description && !draft){
       return res.status(400).json({
          success : false,
          message : "Can't update with all the field blank"
        })
      }

      let findblog = await User.findById(creator).select("-password")
      // console.log(findblog.Blogs.find(blogId => blogId == id));

      const blog = await Blog.findById(id)
      if(!(creator == blog.creator)){
        return res.status(400).json({
          success : false,
          message : "Unauthorized for this action"
        })
      }
      
         

      //  const updatedBlog = await Blog.updateOne( {_id : id} , {title , description , draft}, {new :true})

          blog.title = title || blog.title
           blog.description = description || blog.description
           blog.draft = draft || blog.draft

           await blog.save()

        return res.status(200).json({
            success : true , 
            message : "Blog Updated",
            blog         
        })

    } catch (error) {
        return res.status(400).json({
            success : false ,
            message : "Faild to update" , 
            err : error.message
        })
    }
}
async function deleteBlog(req , res) {
    
    const creator = req.user
    const {id} = req.params;
    console.log(id);
    try {

       const findblog = await Blog.findById(id)
        if(findblog==null){
          return res.status(400).json({
          success : false,
          message : "No blogs found"
        })
      }

       if((findblog.creator != creator)){
        return res.status(400).json({
          success : false,
          message : "You are not authorized for this action"
         })
       }


       
       const blogToDelete = await Blog.findByIdAndDelete(id)
       await User.findByIdAndUpdate(creator , {$pull : {Blogs : id}})
       console.log(blogToDelete);
       return res.status(200).json({
        success : true,
        message : "Deleted successfully"
       })
       
    } catch (error) {
        return res.status(404).json({
            success :false,
            message : "Not deleted",
            err :  error.message
        })
        
    }
}
async function likeBlog (req , res) {
  const creator = req.user
  const {id} = req.params

  try {
        const findblog = await Blog.findById(id)
        if(findblog==null){
          return res.status(400).json({
          success : false,
          message : "No blogs found"
        })
      }

      if(!findblog.likes.includes(creator)){
        await Blog.findByIdAndUpdate(id , {$push : {likes : creator}})
       return res.status(200).json({
          success : true,
          message : "Blog liked "
        })
      }else{
        await Blog.findByIdAndUpdate(id , {$pull : {likes : creator}})
       return res.status(200).json({
          success : true,
          message : "Blog disliked"
        })
      }

  } catch (error) {
     return res.status(500).json({
      success : false,
       message : "ERoor Found",
       err : error.message
    })
    
  }


}
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

        console.log(findcomment , findcomment.user !== userId , userId , findcomment.blog.creator , findcomment.user);

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

  } catch (error) {
     return res.status(500).json({
      success : false,
       message : "Error Found",
       err : error.message
    })
    
  }


}

module.exports = { createBlog, getBlogs, getBlog, updateBlog, deleteBlog , likeBlog, commentBlog , deletecommentBlog};
