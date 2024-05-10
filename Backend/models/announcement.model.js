import mongoose from "mongoose";
import { Schema } from "mongoose";

const announcementSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      unique: true,
    },
    sport: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Announcement", announcementSchema);
