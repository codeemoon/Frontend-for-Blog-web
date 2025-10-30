
const cloudinary = require('cloudinary').v2

async function forImageUploadation (imagepath) {
try {
       const result = await cloudinary.uploader.upload( imagepath , {
        folder : "Blog app images",
    } )
    return result
} catch (error) {
    console.log(error);
}
 
}
module.exports = forImageUploadation