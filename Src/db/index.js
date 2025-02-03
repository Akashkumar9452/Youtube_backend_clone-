import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`\n mongoDB connected !! ${connectionInstance.connection.host}`);
    }catch(error){
        console.log("MONGODB CONNECTION ERROR", ERROR);
        process.exist(1)
    }
}

export default connectDB