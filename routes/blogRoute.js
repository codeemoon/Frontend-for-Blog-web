


const express = require('express');
const { createBlog, getBlogs, getBlog, updateBlog, deleteBlog , likeBlog} = require('../controller/createBlogs');
const verifyUser = require('../middlewares/auth');
const { commentBlog, deletecommentBlog, editcommentBlog, likecommentBlog } = require('../controller/commentController');

let route = express.Router()

//for creating blogs 
route.post("/blog", verifyUser ,createBlog)

route.get("/blog", getBlogs)

route.get("/blog/:id",getBlog)

route.patch("/blog/:id", verifyUser , updateBlog)

route.delete("/blog/:id", verifyUser , deleteBlog)

// for likes
route.post('/blog/like/:id' , verifyUser , likeBlog)
 

//for Comments
route.post('/blog/comment/:id' , verifyUser , commentBlog)

route.delete('/blog/comment/:id' , verifyUser , deletecommentBlog)

route.patch('/blog/edit-comment/:id' , verifyUser , editcommentBlog)

route.post('/blog/like-comment/:id' , verifyUser , likecommentBlog)

module.exports = route
