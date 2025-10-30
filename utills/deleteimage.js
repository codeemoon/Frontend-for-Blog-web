const cloundinary = require('cloudinary').v2

async function deleteImage (imagepath){
    try {
        await cloundinary.uploader.destroy(imagepath)
      
    } catch (error) {
        console.log("Error while deleting image from cloudinary");
        console.log(error);
    }
}

module.exports = deleteImage