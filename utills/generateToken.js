
const JWT = require('jsonwebtoken')

async function  generateJWT (payload){
let Token = await JWT.sign(payload , "JWTkamostimportantthinginworld" , )
return Token;
}
async function  verifyJWT (token){
    try {
        let data = await JWT.verify(token , "JWTkamostimportantthinginworld" )
        return data;
    } catch (error) {
        return false
       
    }

}

async function decodeJWT (token){
    let decoded = await JWT.decode(token)
    console.log("decoded" , decoded)
    return decoded 
}

module.exports = {generateJWT , verifyJWT , decodeJWT}