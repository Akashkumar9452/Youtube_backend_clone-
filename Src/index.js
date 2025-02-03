import dotenv from "dotenv"
import mongoose from "mongoose";
import connectDB from "./db/index.js";
import {app} from './app.js';

dotenv.config({
    path: './env'
})

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`DB connection error - ${err}`));

  app.listen(process.env.PORT || 3000, ()=>{
        console.log(`server id running on port : ${process.env.PORT}`);
    })