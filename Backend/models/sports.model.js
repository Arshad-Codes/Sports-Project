import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const sportsSchema = new Schema({
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
});

export const Sports = mongoose.model('Sports', sportsSchema);
