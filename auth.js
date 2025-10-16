

const express = require('express');


const app = express()
const mongoose = require("mongoose")
const cors = require('cors')

app.use(express.json())
app.use(cors())
async function connectDb (){
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/blogsDatabase")
        console.log("Database conected");
    } catch (error) {
        console.log("Error while connecting database");
    }
}

let userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true,
    },
    password : String
})


let User =  mongoose.model("user" , userSchema)


app.post("/user", async (req , res)=>{

    let { name, email , pass} = req.body
    // console.log(req.body);

    try {
       if(!name){
       return res.status(400).json({
            success : false,
            message : "Please enter name"
        })
       }
       if(!email){
        return res.status(400).json({
            success : false,
            message : "Please enter email"
        })
       }
       if(!pass){
        return res.status(400).json({
            success : false,
            message : "Please enter password"
        })
       }
       
       const checkForExistingUSer = await User.findOne({email})

       if(checkForExistingUSer){
        return res.status(400).json({
            success :false,
            message :"Email already registerd"
        })
       }

       
       const newUser = await User.create({name, email, password : pass})
       return res.status(200).json({
        success : true,
        message : "User created",
        newUser,
        
    })
    } catch (error) {
       return res.status(500).json({
            success : false,
            message : "Try again",
            err : error.message 
        })
    }

})

app.get("/user", async (req , res)=>{
    try {
        let getUser = await User.find({})
      return  res.status(200).json({
            success : true,
            message : "User fetched successfuly",
           getUser,
        })
    } catch (error) {
       return res.status(404).json({
            success : false,
            message : "Error while fetching users"
        })
    }

})

app.get("/user/:id",async (req , res)=>{
    const {id} = req.params

    try {


        let getUserById = await User.findById(id)
      
        if(!getUserById){ 
       return   res.status(404).json({
            success : false,
            messege : "User not found",
        })
        }
    

   return res.status(200).json({
        success : true,
        messege : "user fetched by id",
        getUserById,
    })


    } catch (error) {
     return   res.status(500).json({
            success : false,
            messege : "Failed to fetch by id",
            err : error.message
        })
    }
})

app.patch("/user/:id", async (req ,res)=>{
    try {
       
        let {id} = req.params
        const {name} = req.body
        

      let updatedUser = await User.findByIdAndUpdate(id , {name } , {new : true})
      console.log(updatedUser);

      if(!updatedUser){
       return res.status(404).json({
            success : false,
            message : "User not found"

        })
      }

       return res.status(200).json({
            success : true,
            messege : "updates Success",
        })


    } catch (error) {
      return  res.status(500).json({
            success: false,
            messege: "updation failed, try again"
        })
    }
})

app.delete("/user/:id" , async(req , res)=>{
    try {
        let {id}= req.params

         let userDeleted = await User.findByIdAndDelete(id)
         if(!userDeleted){
          return  res.status(404).json({
                success : false,
                message : "User not found"
            })
         }
       return res.status(200).json({
            success : true,
            messege : "user deleted"
        })
    } catch (error) {
       return res.status(500).json({
            success : false,
            message : "Not deleted, try again"
        })
    }
})


//----------------------------------------BLOGS--------------------------------

const blogs = []

app.post("/blog",(req , res)=>{
    blogs.push({...req.body , id : blogs.length +1});
   return res.json({messege : "Blog Posted"})
})
app.get("/blog",(req , res)=>{
   
     res.json({... req.body})
    
})
app.get("/blog/:id",(req , res)=>{
    const {id} = req.params
    let searchBlog = blogs.filter(item=> item.id == id )
     res.json(searchBlog)
})
app.patch("/blog/:id",(req , res)=>{
    const {id} =req.params;
    let index = blogs.findIndex(item => item.id == id)
    blogs[index] = {...blogs[index], ...req.body}

    res.json({messege : "blog updated"})
    
})
app.delete("/blog/:id",(req , res)=>{
    const {id} =req.params
    let del = blogs.filter(item => item.id == id)
    blogs.splice(del, 1)
    res.json({messege : "Deleted"})
     
})



app.listen(3020, ()=>{
    console.log("Server activated");
    connectDb()
})