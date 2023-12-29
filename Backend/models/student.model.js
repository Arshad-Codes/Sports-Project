import mongoose from "mongoose";
import { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Student", studentSchema);
