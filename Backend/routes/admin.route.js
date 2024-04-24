import express from 'express';
import {
  login,
  logout,
  register,
  getAdmin,
  updateAdmin,
} from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/getAdmin', getAdmin);
router.put('/updateAdmin', updateAdmin);

export default router;
