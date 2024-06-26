import express from 'express';
import {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementsforSport,
  deleteAnnouncement,
  updateAnnouncement
} from '../controllers/announcement.controller.js';

const router = express.Router();

router.post('/createAnnouncement', createAnnouncement);
router.post('/getAnnouncementforSport/:sportId', getAnnouncementsforSport);
router.get('/getAnnouncement', getAnnouncements);
router.post('/deleteAnnouncement', deleteAnnouncement);
router.put("/:_id", updateAnnouncement);

export default router;
