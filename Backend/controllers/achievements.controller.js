import Achievements from "../models/achievements.model";
import jwt from "jsonwebtoken";

export const createAchievement = async (req, res) => {
    const newachievement = new Achievements({
        ...req.body
    })
    try {
        const savedAchievement = await newachievement.save()
        res.status(200).json(savedAchievement);
    } catch (error) {
        res.status(500).send("something went wrong");
    }
};


export const deleteAchievement = async (req, res) => {
    try {
        const achievement = await Achievements.findByIdAndDelete(req.params.id);
        if (!achievement) {
            return res.status(404).json({ message: "Achievement not found" });
        }
        res.status(200).json({ message: "Achievement deleted successfully" });
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
};

export const getAchievements = async (req, res) => {
    try {
        const achievements = await Achievements.find();
        res.status(200).send(achievements);
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
};

export const getAchievement = async (req, res) => {
    try {
        const achievement = await Achievements.findById(req.params.id);
        if (!achievement) {
            return res.status(404).json({ message: "Achievement not found" });
        }
        res.status(200).send(achievement);
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
};

export const updateAchievement = async (req, res) => {
    try {
        const achievement = await Achievements.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        if (!achievement) {
            return res.status(404).json({ message: "Achievement not found" });
        }
        res.status(200).json({ message: "Achievement updated successfully" });
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
}

 


