import dotenv from "dotenv"
import mongoose from "mongoose";
import connectDB from "./db/index.js";
import {app} from './app.js';

dotenv.config({
    path: './env'
})
console.log("hello")

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000, ()=>{
        console.log(`server id running on port : ${process.env.PORT}`);
    })
})

.catch((err)=> {
    console.log("MONGO DB connection failed !!", err)
})