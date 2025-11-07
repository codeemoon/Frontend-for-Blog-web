import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddBlogPage() {
  const token = JSON.parse(localStorage.getItem("Token"));
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    image: null,
  });
  
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!token) {
  //     toast.error("Sign-in first");
  //     navigate("/signin");
  //   }
  // });

  async function handelBlog() {

    try {
      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("description", blogData.description);
      formData.append("image", blogData.image[0])
    // const response = await axios.post( `http://localhost:3020/api/v1/blog`, formData, 
    //   {headers : {
    //     "Content-Type" : "multipart/form-data",
    //     Authorization: `Bearer ${token}`
    //   }}
    // )
    console.log(response);
    toast.success(response.data.message)
    navigate("/")
    } catch (error) {
      
      toast.error(error.response.data.message)
    }

  }

  return (
    <div className="w-[500px]">
      <label htmlFor="">Title</label>
      <input onChange={(e)=>setBlogData((preVal)=>({...preVal, title : e.target.value}))} type="text" />
      <label htmlFor="">Description</label>
      <input onChange={(e)=>setBlogData((preVal)=>({...preVal, description : e.target.value}))} type="text" />

      <div> 
      <label htmlFor="image" className="">
        {
          blogData.image ? <img src={URL.createObjectURL(blogData.image[0])} alt="" className="aspect-video object-cover" /> : <div className="bg-slate-400 aspect-video flex justify-center items-center text-4xl">Select image</div>
        }        
      </label>
      <input className="hidden" id="image" onChange={(e)=>setBlogData((preVal)=>({...preVal, image : e.target.files}))} type="file" accept=".png , .jpeg , .pdf" />
      </div>
      <button className="relative left-10" onClick={handelBlog}>Post blog</button>
    </div>
  );
}

export default AddBlogPage;
