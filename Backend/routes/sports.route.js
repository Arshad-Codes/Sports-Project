import express from "express";
import { createsport } from "../controllers/sports.controller.js";
import multer from 'multer';



// router.post("/createsport",createsport);

const router = express.Router();

const upload = multer({ dest: 'uploads/' }); 

// imageurl for uploding image in clodinary
// cloudinary media librayla you can see tha uploded picture
router.post("/createsport", upload.single('imageUrl'), createsport);

export default router;
