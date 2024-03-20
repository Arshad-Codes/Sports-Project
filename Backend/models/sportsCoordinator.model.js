import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const sportsCoordinatorSchema = new Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
  },
  position: {
    type: String,
  },
  sport: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model('SportsCoordinator', sportsCoordinatorSchema);
