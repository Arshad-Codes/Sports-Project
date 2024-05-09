import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const sportSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  team:{
    type: [String],
  },
  enrolledStudents: {
    type: [String],
  },
  announcements:{
    type: [String],
  },
  }
);

export default mongoose.model('Sport', sportSchema);
