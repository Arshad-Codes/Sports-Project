
import express from "express";
import { createCoordinator,deleteCoordinator,getCoordinators } from "../controllers/sportsCoordinator.controller.js";
import {verifyTokenAdmin} from "../middleware.js";

const router = express.Router();

router.post('/registercoordinator', verifyTokenAdmin ,createCoordinator);
router.get('/getcoordinators', getCoordinators);
router.delete('/deletecoordinator/:id', verifyTokenAdmin, deleteCoordinator);
export default router;
