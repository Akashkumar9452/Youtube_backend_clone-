import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "modules/user.model.js";
import {uploadONCloudnary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/Apiresponse.js";

const registerUser = asyncHandler(async (req, res) => {
       // get user detail from frontend 
       // validation the user 
       // check user already exist or not 
       // check for images and check for avatar 
       // upload them to cloudinary
       // create user object create entry in database 
       
       const {fullName, email, username, password} = req.body;
       console.log("email", email);
       if(
        [fullName, email, username, password].some((field)=>
        field?.trim()=="")
       ){
         throw new ApiError(400, "All fiels are required")
       }

       const existedUser = User.findOne({
        $or : [{username}, {email}]
       })

       if(existedUser){
         throw new ApiError(409, "User with email or User name already exists")
       }

       const avatarLocalPath = req.files?.avatar[0]?.path;
       const coverImageLocalPath = req.files?.coverImage[0]?.path;

       if(!avatarLocalPath){
        throw new ApiError(404, "some files are missing")
       }

    const avatar =  await uploadONCloudnary(avatarLocalPath)
    const coverimage = await uploadONCloudnary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.Url,
        email,
        password,
        username: username.toLowerCase(),
        coverImage: CoverImage.Url || "",

    })
     
     const nn = await User.findById(user._id).select(
        "-password -refreshToken"
     )
     if(!nn){
        throw new ApiError(500, "something went wrong");
     }

     return res.status(201).json(
        new ApiResponse(200,createdUser, "User created successfully")
     )

})


 
export {registerUser};