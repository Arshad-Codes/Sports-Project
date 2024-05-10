import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin.route.js';
import studentRoutes from './routes/student.route.js';
import sportsCoordinatorRoutes from './routes/sportsCoordinator.route.js';
import achievementRoutes from './routes/achievements.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import sportsRoutes from './routes/sports.route.js';
import announcementRoutes from './routes/announcement.route.js';

const app = express();
dotenv.config();

const connectiondb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('connection to db successful');
  } catch (error) {
    console.log(error);
  }
};

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/sportscoordinator', sportsCoordinatorRoutes);
app.use('/api/sport', sportsRoutes);
app.use('/api/achievement', achievementRoutes);
app.use('/api/announcement', announcementRoutes);

app.listen(process.env.PORT, () => {
  connectiondb();
  console.log('backend server running at port 8800');
});
