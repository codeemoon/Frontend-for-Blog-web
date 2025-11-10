import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BlogPage() {
    
    const [blogs , setBlogs] = useState()
    const {id}= useParams()
    console.log(id);

    async function getBlogById () {

        const response = await axios.get(`http://localhost:3020/api/v1/blog/${id}`)
        setBlogs(response?.data)
    }
    console.log(blogs);

useEffect(()=>{
    getBlogById()
}, [])
  return (
    <div>
      helloo blog page
    </div>
  );
}

export default BlogPage;
