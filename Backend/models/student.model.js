import mongoose from "mongoose";
import { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dateofBirth: {
      type: Date,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    regNo: {
      type: String,
      required: true,
      unique: true,
    },
    achievements: {
      type: String,
    },
    nicNo: {
      type: String,
      required: true,
      unique: true,
    },
    verified: {
      type: Boolean,
      default:false,
    },
    enrolledSports: {
      type: [String],
    },
  }, 
  {
    timestamps: true,
  }
);

export default mongoose.model("Student", studentSchema);
