import express from 'express';
import {
  register,
  login,
  logout,
  verify,
  getStudents,
  enrollToSport,
  getStudentById,
  updateStudent,
  sendEmail,
  getEnrolledSports,
  deleteStudent,
} from '../controllers/student.controller.js';

import { verifyTokenAdmin } from "../middleware.js";


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/getStudents', getStudents);
router.get('/verify/:studentId/:uniqueString', verify);
router.post('/enroll', enrollToSport);
router.post('/sendEmail', sendEmail);
router.get('/:studentId', getStudentById);
router.put('/:studentId', updateStudent);
router.post('/getEnrolledSports', getEnrolledSports);

router.delete('/deleteStudent/:email', verifyTokenAdmin, deleteStudent);


export default router;
