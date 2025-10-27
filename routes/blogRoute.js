


const express = require('express');
const { createBlog, getBlogs, getBlog, updateBlog, deleteBlog , likeBlog, commentBlog, deletecommentBlog } = require('../controller/createBlogs');
const verifyUser = require('../middlewares/auth');

let route = express.Router()


route.post("/blog", verifyUser ,createBlog)

route.get("/blog", getBlogs)

route.get("/blog/:id",getBlog)

route.patch("/blog/:id", verifyUser , updateBlog)

route.delete("/blog/:id", verifyUser , deleteBlog)

route.post('/blog/like/:id' , verifyUser , likeBlog)

route.post('/blog/comment/:id' , verifyUser , commentBlog)

route.delete('/blog/comment/:id' , verifyUser , deletecommentBlog)

module.exports = route
