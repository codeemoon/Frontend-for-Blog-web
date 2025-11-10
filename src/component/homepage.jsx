import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Homepage() {

    const[gettingBlogs , setGettingBlogs] = useState([])

   async function fetchBlogs (){
      const result = await axios.get('http://localhost:3020/api/v1/blog')
      setGettingBlogs(result?.data?.blogs)
    }

    useEffect(()=>{
        fetchBlogs()
    },[])
    
console.log(gettingBlogs);



  return (
    <div className='w-[70%]'>
      {
       gettingBlogs.map(data=>(
        <Link to={"blog/" + data._id}> 
          <div key={data._id} className='w-full my-10 border flex justify-between'> 
        <div className='w-[60%] flex flex-col gap-2'>
            <div >                
                <img src="" alt="" />
                <p>{data.creator.name}</p>
            </div>
            <h1 className='font-bold text-3xl'>{data.title}</h1>
            <h4 className='line-clamp-2'>{data.description}</h4>

            <div className='flex gap-2'>
              <p>{ Date(data.createdAt).toLocaleString() }</p>
              <p>500 like</p>
              <p>200 comment</p>
           </div>
        </div>

        <div className='w-[25%]'>
            <img src={data.image} alt="" />
        </div>
      </div>
      </Link>
       ))
    }

    </div>
  );
}

export default Homepage;
