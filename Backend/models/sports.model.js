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
});

export const Sports = mongoose.model('Sport', sportSchema);
