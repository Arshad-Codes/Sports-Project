import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const connectiondb = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("connection to db successful");
    } catch (error) {
      handleError(error);
    }

}

app.listen(8800,()=>{
    connectiondb();
    console.log("backend server running at port 8800")
})
