import express from "express";
import { createCoordinator,deleteCoordinator,getCoordinators } from "../controllers/sportsCoordinator.controller.js";

const router = express.Router();



router.post("/registercoordinator",createCoordinator)
router.get("/getcoordinators",getCoordinators)
router.delete("/deletecoordinator/:id",deleteCoordinator)
export default router;
