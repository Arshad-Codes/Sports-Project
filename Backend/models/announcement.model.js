import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const announcementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
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

export default mongoose.model('Announcement', announcementSchema);
