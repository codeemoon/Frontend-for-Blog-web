const Blog = require("../model/blogSchema");

async function createBlog(req, res) {
  const { title, description, draft } = req.body;
  try {
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
    let registerBlog = await Blog.create({ title, description, draft });
    return res.status(200).json({
      success: true,
      message: "Blog posted",
      registerBlog,
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
    let blogs = await Blog.find({draft:false});
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
    let blogById = await Blog.findById(id);
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
    const {id} = req.params;
    const {title , description} = req.body
    try {
        let blog  = await Blog.findByIdAndUpdate(id , {title , description}, {new :true})
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
    const {id} = req.params;
    try {
        blogToDelete = await Blog.findByIdAndDelete(id)
        return res.status(200).json({
            success : true, 
            message : "Delete successfully",
        })
    } catch (error) {
        return res.status(404).json({
            success :false,
            message : "Not deleted",
            err :  error.message
        })
        
    }
}

module.exports = { createBlog, getBlogs, getBlog, updateBlog, deleteBlog };
