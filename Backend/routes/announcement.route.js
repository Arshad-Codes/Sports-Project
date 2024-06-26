import express from 'express';
import {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementsforSport,
  deleteAnnouncement,
} from '../controllers/announcement.controller.js';

const router = express.Router();

router.post('/createAnnouncement', createAnnouncement);
router.post('/getAnnouncementsforSport', getAnnouncementsforSport);
router.get('/getAnnouncement', getAnnouncements);
router.post('/deleteAnnouncement', deleteAnnouncement);

export default router;
