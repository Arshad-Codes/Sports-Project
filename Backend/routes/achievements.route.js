import { express } from "express";
import { getAchievements, getAchievement, createAchievement, updateAchievement, deleteAchievement } from "../controllers/achievements.controller.js";

const router = express.Router();

router.get("/", getAchievements);
router.get("/:id", getAchievement);
router.post("/create", createAchievement);
router.put("/:id", updateAchievement);
router.delete("/:id", deleteAchievement);
