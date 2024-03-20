import express from "express";
import { getAchievements, getAchievement, createAchievement, updateAchievement, deleteAchievement } from "../controllers/achievements.controller.js";
import { verifyTokenAdmin } from "../middleware.js";

const router = express.Router();

router.get("/", getAchievements);
router.get("/:id", getAchievement);
router.post("/create", verifyTokenAdmin, createAchievement);
router.put("/:title",verifyTokenAdmin, updateAchievement);
router.delete("/:title",verifyTokenAdmin, deleteAchievement);

export default router;