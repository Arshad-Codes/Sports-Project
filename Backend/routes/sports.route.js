import express from 'express';
import { createsport, getSports } from '../controllers/sports.controller.js';

// router.post("/createsport",createsport);

const router = express.Router();

// imageurl for uploding image in clodinary
// cloudinary media librayla you can see tha uploded picture
router.post('/createsport', createsport);
router.get('/getSports', getSports);

export default router;
