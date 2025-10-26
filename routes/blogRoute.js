


const express = require('express');
const { createBlog, getBlogs, getBlog, updateBlog, deleteBlog , likeBlog } = require('../controller/createBlogs');
const verifyUser = require('../middlewares/auth');

let route = express.Router()


route.post("/blog", verifyUser ,createBlog)

route.get("/blog", getBlogs)

route.get("/blog/:id",getBlog)

route.patch("/blog/:id", verifyUser , updateBlog)

route.delete("/blog/:id", verifyUser , deleteBlog)

route.post('/blog/like/:id' , verifyUser , likeBlog)

module.exports = route
