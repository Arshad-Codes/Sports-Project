import express from 'express';
import {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementsforSport,
  deleteAnnouncement,
} from '../controllers/announcement.controller.js';

const router = express.Router();

router.post('/createAnnouncement', createAnnouncement);
router.post('/getAnnouncementforSport', getAnnouncementsforSport);
router.get('/getAnnouncement', getAnnouncements);
router.delete('/deleteAnnouncement', deleteAnnouncement);

export default router;
