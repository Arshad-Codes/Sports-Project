import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const liveSchema = new Schema({
  meetingId: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model('Live', liveSchema);
