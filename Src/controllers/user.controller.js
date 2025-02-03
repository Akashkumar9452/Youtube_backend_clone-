import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadONCloudnary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/Apiresponse.js";


const registerUser = asyncHandler(async (req, res) => {
       // get user detail from frontend 
       // validation the user 
       // check user already exist or not 
       // check for images and check for avatar 
       // upload them to cloudinary
       // create user object create entry in database 
       
       console.log("========= DEBUG INFO =========");
       console.log("Request headers:", req.headers['content-type']);
       console.log("Request body:", req.body);
       console.log("Request files:", req.files);
       console.log("============================");

       const {fullName, email, username, password} = req.body;
       
       // Log individual fields
       console.log("Extracted fields:", {
           fullName,
           email,
           username,
           password: password ? '[PRESENT]' : '[MISSING]'
       });

       // Validate required fields
       if (!fullName || !email || !username || !password) {
           throw new ApiError(400, "All fields are required");
       }

       if ([fullName, email, username, password].some((field) => 
           field?.trim() === "")
       ) {
           throw new ApiError(400, "All fields must not be empty");
       }

       const existedUser = await User.findOne({
        $or : [{username}, {email}]
       })

       if(existedUser){
         throw new ApiError(409, "User with email or username already exists")
       }

       const avatarLocalPath = req.files?.avatar?.[0]?.path;
       const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

       console.log("local path", avatarLocalPath, coverImageLocalPath);

       if (!avatarLocalPath) {
           throw new ApiError(400, "Avatar file is required");
       }

       const avatar = await uploadONCloudnary(avatarLocalPath);
       let coverImage;
       if (coverImageLocalPath) {
           coverImage = await uploadONCloudnary(coverImageLocalPath);
       }

       if (!avatar || !avatar.url) {
           throw new ApiError(400, "Error while uploading avatar file");
       }

       const user = await User.create({
           fullname: fullName.trim(),
           avatar: avatar.url,
           email: email.trim(),
           password,
           username: username.toLowerCase().trim(),
           coverImage: coverImage?.url || "",
       })
     
       const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
       )
       if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user");
       }

       return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
       )

})


 
export {registerUser};