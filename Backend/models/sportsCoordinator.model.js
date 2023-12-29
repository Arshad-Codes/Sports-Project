import mongoose from "mongoose";
import { Schema } from "mongoose";

const sportsCoordinatorSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("SportsCoordinator", sportsCoordinatorSchema);
