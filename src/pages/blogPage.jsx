import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function BlogPage() {
    
    const [blogs , setBlogs] = useState(null )
    const {id}= useParams()
    console.log(id);

    async function getBlogById () {
        try {
        const response = await axios.get(`http://localhost:3020/api/v1/blog/${id}`)
        setBlogs(response?.data?.blogById)            
        } catch (error) {
            toast.error(error)
        }


    }
    console.log(blogs);

useEffect(()=>{
    getBlogById()
}, [])
  return (
    <div>
      {
        blogs ? <div>
            <h1 className='mt-10 font-bold text-6xl'>{blogs.title}</h1>
            <h1 className='my-5 text-3xl'>{blogs.description}</h1>
            <img className='h-[300px] w-[400px]' src={blogs.image} alt="" />
        </div> : <h1>LOADING ...</h1>
      }
    </div>
  );
}

export default BlogPage;
