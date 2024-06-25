import express from 'express';
import {
  createsport,
  getSports,
  deleteSport,
  getEnrolledStudents,
  getEnrolledStudentsbyname,
} from '../controllers/sports.controller.js';
import { verifyTokenAdmin } from '../middleware.js';

const router = express.Router();

// imageurl for uploding image in clodinary
// cloudinary media librayla you can see tha uploded picture
router.post('/createsport', verifyTokenAdmin, createsport);
router.get('/getSports', getSports);
router.delete('/deleteSport/:id', verifyTokenAdmin, deleteSport);
router.post('/getenrolledstudents', getEnrolledStudents);
router.post("/getenrolledstudentsbyname", getEnrolledStudentsbyname);

export default router;
