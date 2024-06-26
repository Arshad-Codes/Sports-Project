import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const liveSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  meetingId: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model('Live', liveSchema);
