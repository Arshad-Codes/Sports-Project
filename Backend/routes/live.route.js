import express from 'express';
import {
  createLive,
  deleteLive,
  getLive,
} from '../controllers/live.controller.js';
const router = express.Router();

router.post('/createlive', createLive);
router.get('/getlive', getLive);
router.delete('/deletelive/:meetingId', deleteLive);

export default router;
