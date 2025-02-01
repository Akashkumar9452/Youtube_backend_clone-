import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username:{
            type: string,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
            index: true,
       },
        email :{
        type: string,
        required: true,
        
       },
       
       fullname:{
        type: string,
        required: true,
        trim: true,
        index: true,
       },

       avatar:{
         type: string, // cloudnary service
         required: true,
       },

       coverImage: {
        type: string,

       },

       watchHistory:{
         type: Schema.Types.ObjectId,
         ref: "video"
       },

       password:{
        type: string,
        required: [true, 'password is required '],
       },
       
       refreshToken:{
         type: string,  
       },




    
},{timestamps: true})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()
    this.password= bcrypt.hash(this.password, 10)
    next()
}) 

userSchema.methods.ispasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
     return  jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.unsername,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_SECRET_EXPIRY, 
        }
     )
}

userSchema.methods.generateRefreshAccessToken = function(){
    return  jwt.sign(
       {
           _id: this._id,
       },
       process.env.REFRESH_TOKEN_SECRET,
       {
           expiresIn: process.env.REFRESH_TOKEN_EXPIRY, 
       }
    )
}
 
export const User = mongoose.model("User", userSchema)