import express from 'express';
import {
  login,
  logout,
  register,
  getAdmin,
  updateAdmin,
  getExcuses
} from '../controllers/admin.controller.js';
import { verifyTokenAdmin } from '../middleware.js';
import { get } from 'mongoose';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/getAdmin', getAdmin);
router.put('/updateAdmin', updateAdmin);
router.get('/getexcuses',verifyTokenAdmin,getExcuses);

export default router;
