import {v2 as cloudinary} from "clouinary"; 
import fs from "fs";

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_KEY,

});

const uploadONCloudnary = async (localFilePath)=>{
     try{
        if(!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded successfully
        console.log(response.url);
        return response;
    } catch(error){
        fs.unlinkSync(localFilePath) // remove the locally saved tempary file that are uploaded in the server 
        return;
    }
}

export {uploadONCloudnary};
