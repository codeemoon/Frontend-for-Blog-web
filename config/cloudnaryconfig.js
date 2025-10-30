const cloudinary = require('cloudinary').v2

async function cloudniaryConfig (){
    try {
    await cloudinary.config({
        cloud_name: 'dtwvkfty9', 
        api_key: '456348444312744', 
        api_secret: 'cD652kosOa0UzdaXwDRgVoQ05Jo'
    })
    console.log("Cloudinarry connected");
    } catch (error) {
        console.log("Error while configuring CLOUDNIARY");
        console.log(error.message);
    }

}

module.exports = cloudniaryConfig