import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const excuseSchema = new Schema(
  {
    studentId: {
      type: String,
    },
    reciever: {
      type: String,
    },
    reason: {
      type: String,
    },
    status: {
      type: String,
    },
    date: {
      type: Date,
    },
    subject: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Excuse', excuseSchema);
