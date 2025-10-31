import { useState } from "react";
import {toast} from "react-hot-toast";
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";

function AuthForm({ type }) {
  
  const navigate = useNavigate()  
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  async function handelAuthForm(e) {
    e.preventDefault();

    try {
    //   const response = await fetch(`http://localhost:3020/api/v1/${type}`, {
    //     method: "POST",
    //     body: JSON.stringify(userDetails),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

      const result = await axios.post(`http://localhost:3020/api/v1/${type}` ,
        userDetails
      )
 console.log(result);
    
     localStorage.setItem("user" , JSON.stringify(result?.data?.user))
     localStorage.setItem("Token" , JSON.stringify(result?.data.Token))
      
     if(result){
       return toast.success(result.data.message)
     }
      
    } catch (error) {
        toast.error(error.response.data.message)
      
    }
  }

  function handelNavi (){
    navigate("/signin")
  }

  return (
    <div className="w-[20%]  flex flex-col items-center ">
      <h1 className="text-3xl">{type == "signin" ? "Sign in" : "Sign up"}</h1>
      <br />
      <form
        className="w-full  flex flex-col items-center"
        onSubmit={handelAuthForm}
      >
        {type == "signup" ? (
          <input
            className="w-full h-[50px] bg-gray-500 text-white focus:outline-none pl-2 rounded-md "
            type="text"
            name=""
            id=""
            placeholder="name"
            onChange={(e) =>
              setUserDetails((preVal) => ({ ...preVal, name: e.target.value }))
            }
          />
        ) : (
          ""
        )}

        <br />
        <input
          className="w-full h-[50px] bg-gray-500 text-white focus:outline-none pl-2 rounded-md "
          type="email"
          name=""
          id=""
          placeholder="email"
          onChange={(e) =>
            setUserDetails((preVal) => ({ ...preVal, email: e.target.value }))
          }
        />
        <br />
        <input
          className="w-full h-[50px] bg-gray-500 text-white focus:outline-none pl-2 rounded-md "
          type="password"
          name=""
          id=""
          placeholder="Password"
          onChange={(e) =>
            setUserDetails((preVal) => ({
              ...preVal,
              password: e.target.value,
            }))
          }
        />
        <br />
        <button className="w-full h-[50px]  text-black focus:outline-none pl-2 rounded-2xl cursor-pointer text-2xl  hover:bg-gray-500 opacity-80 duration-200">
          {type == "signup" ? "Register" : "Login"}
        </button>

      </form>
      {
        type ==="signin" ? <Link to={"/signup"}> <p className="mt-2 hover:underline">Don't have an account</p> </Link> : <Link to={"/signin"}> <p className="mt-2 hover:underline">Already have an account</p> </Link>
      }
    </div>
  );
}

export default AuthForm;
