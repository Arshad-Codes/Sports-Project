import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const liveAdminSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('LiveAdmin', liveAdminSchema);
