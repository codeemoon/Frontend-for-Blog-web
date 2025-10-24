const { verifyJWT } = require("../utills/generateToken")



const verifyUser = async (req , res , next)=>{
   let token = req.headers.authorization.split(" ")[1]
   if(!token){
    return res.status(400).json({
        success : false,
        message : "Please sign in"
    })
   }

   try {
   let user = await verifyJWT(token)
   if(!user){
    return res.status(400).json({
        success : fail,
        meaasge : "Please sign in"
    })
   }
   

   req.user = user.id
   next()

   } catch (error) {
    res.status(500).json({
        success : false,
        message : "something went wrong"
    })
   }
}

module.exports = verifyUser