const cloudinary = require("cloudinary").v2;
const{CloudinaryStorage}= require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLODINARY_CLOUD_NAME,
    api_key: process.env.CLODINARY_KEY,
   api_secret: process.env.CLODINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
    folder:"YelpCamp",
    allowedFormats:['jpeg','png','jpg']
    }
});

module.exports = {
    cloudinary,
    storage
}









