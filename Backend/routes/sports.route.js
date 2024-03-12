import express from 'express';
import {
  register,
  login,
  logout,
  verify,
} from '../controllers/student.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/verify/:studentId/:uniqueString', verify);

export default router;
