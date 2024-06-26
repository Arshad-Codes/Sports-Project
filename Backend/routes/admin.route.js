import express from 'express';
import {
  login,
  logout,
  register,
  getAdmin,
  updateAdmin,
  getExcuses,
  approveExcuse,
  disapproveExcuse
} from '../controllers/admin.controller.js';
import { verifyTokenAdmin } from '../middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/getAdmin', getAdmin);
router.put('/updateAdmin', updateAdmin);
router.get('/getexcuses',verifyTokenAdmin,getExcuses);
router.post('/approveExcuse',verifyTokenAdmin,approveExcuse);
router.post('/disapproveExcuse',verifyTokenAdmin,disapproveExcuse);


export default router;
