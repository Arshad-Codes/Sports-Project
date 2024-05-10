import express from 'express';
import {
  createAnnouncement,
  getAnnouncementsforSport,
} from '../controllers/announcement.controller';

const router = express.Router();

router.post('/createAnnouncement', createAnnouncement);
router.get('/getAnnouncement', getAnnouncementsforSport);

export default router;
