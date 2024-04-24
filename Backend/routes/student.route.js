import express from 'express';
import {
  register,
  login,
  logout,
  verify,
  getStudents,
} from '../controllers/student.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/getStudents', getStudents);
router.get('/verify/:studentId/:uniqueString', verify);

export default router;
