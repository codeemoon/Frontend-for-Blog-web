

const  express = require('express')
const {createuser , checkUser , checkUserById , userUpdation , userDeletion, login} = require('../controller/createUser')
const User = require('../model/userSchema')

const route = express.Router()

route.post("/user", createuser )

route.post("/user/login",login )

route.get("/user", checkUser)

route.get("/user/:id", checkUserById)

route.patch("/user/:id", userUpdation )

route.delete("/user/:id" ,  userDeletion)


module.exports = route