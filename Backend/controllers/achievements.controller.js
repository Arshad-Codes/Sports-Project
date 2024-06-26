import Achievements from '../models/achievements.model.js';

export const createAchievement = async (req, res) => {
  if (req.role !== 'admin')
    return res.status(403).send('Unautorized Access. You are not a admin');
  const newachievement = new Achievements({
    ...req.body,
  });
  try {
    const savedAchievement = await newachievement.save();
    res.status(200).json(savedAchievement);
  } catch (error) {
    res.status(500).send('something went wrong');
  }
};

export const deleteAchievement = async (req, res) => {
  try {
    if (req.role !== 'admin')
      return res.status(403).send('Unautorized Access. You are not a admin');
    const achievement = await Achievements.findOneAndDelete({
      title: req.params.title,
    });
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    res.status(200).json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievements.find();
    res.status(200).send(achievements);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

export const getAchievement = async (req, res) => {
  try {
    const achievement = await Achievements.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    res.status(200).send(achievement);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

export const updateAchievement = async (req, res) => {
  try {
    if (req.role !== 'admin')
      return res.status(403).send('Unautorized Access. You are not a admin');
    const achievement = await Achievements.findOneAndUpdate(
      { title: req.params.title },
      { $set: req.body },
      { new: true }
    );
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    res.status(200).json({ message: 'Achievement updated successfully' });
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

export const updateAchievements = async (req, res) => {
  try {
    const achievement = await Achievements.findById(req.params._id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    const { title, description, imgUrl } =
      req.body;

    achievement.title = title || achievement.title;
    achievement.description = description || achievement.description;
    achievement.imgUrl = imgUrl || achievement.imgUrl;

    await achievement.save();
    // res.status(200).json({ message: 'Achievement details updated successfully' });
    res.status(200).send(achievement);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

