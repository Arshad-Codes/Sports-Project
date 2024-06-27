import express from 'express';
import {
  createsport,
  getSports,
  deleteSport,
  getEnrolledStudents,
  getEnrolledStudentsbyname,
  addaTeamMember,
  updateSports,
  removeaTeamMember,
  getSportAnnouncements,
} from '../controllers/sports.controller.js';
import { verifyTokenAdmin } from '../middleware.js';

const router = express.Router();

// imageurl for uploding image in clodinary
// cloudinary media librayla you can see tha uploded picture
router.post('/createsport', verifyTokenAdmin, createsport);
router.get('/getSports', getSports);
router.delete('/deleteSport/:id', verifyTokenAdmin, deleteSport);
router.post('/addateammember', addaTeamMember);
router.put('/:_id', verifyTokenAdmin, updateSports);
router.get('/getSportAnnouncements/:sportId', getSportAnnouncements);
router.post('/getenrolledstudents', getEnrolledStudents);
router.post('/getenrolledstudentsbyname', getEnrolledStudentsbyname);
router.post('/deleteteammember', verifyTokenAdmin, removeaTeamMember);
export default router;
