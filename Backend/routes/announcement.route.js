import express from 'express';
import {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementsforSport,
} from '../controllers/announcement.controller.js';

const router = express.Router();

router.post('/createAnnouncement', createAnnouncement);
router.get('/getAnnouncementforSport', getAnnouncementsforSport);
router.get('/getAnnouncement', getAnnouncements);

export default router;
