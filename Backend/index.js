import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin.route.js";
import studentRoutes from "./routes/student.route.js";
import sportsCoordinatorRoutes from "./routes/sportsCoordinator.route.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connectiondb = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("connection to db successful");
    } catch (error) {
      console.log(error);
    }

}

app.use(express.json());
app.use(cookieParser());

app.use("/api/admin",adminRoutes);
app.use("/api/student",studentRoutes);
app.use("/api/sportscoordinator",sportsCoordinatorRoutes);


app.listen(process.env.PORT,()=>{
    connectiondb();
    console.log("backend server running at port 8800")
})
