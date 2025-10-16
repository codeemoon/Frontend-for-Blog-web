


const express = require('express');
const { createBlog, getBlogs, getBlog, updateBlog, deleteBlog } = require('../controller/createBlogs');

let route = express.Router()


route.post("/blog",createBlog)

route.get("/blog", getBlogs)

route.get("/blog/:id",getBlog)

route.patch("/blog/:id",updateBlog)

route.delete("/blog/:id", deleteBlog)

module.exports = route
