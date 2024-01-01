import mongoose from "mongoose";
import { Schema } from "mongoose";

const studentVerificationSchema = new Schema(
  {
    userId: {
      type: String,
    },
    uniqueString: {
      type: String,
      
    },
    createdAt: {
      type: Date,
    },
    expiredAt: {
      type: Date,
    },
  }
);

export default mongoose.model("StudentVerification", studentVerificationSchema);
