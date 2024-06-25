import Lives from '../models/live.model.js';

export const createLive = async (req, res) => {
  console.log(req.body);
  const newLive = new Lives({
    ...req.body,
  });
  try {
    const savedLive = await newLive.save();
    res.status(200).json(savedLive);
  } catch (error) {
    res.status(500).send('something went wrong');
  }
};

export const deleteLive = async (req, res) => {
  try {
    const live = await Lives.findOneAndDelete({
      meetingId: req.params.meetingId,
    });
    if (!live) {
      return res.status(404).json({ message: 'Live not available' });
    }
    res.status(200).json({ message: 'Live ended successfully' });
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

export const getLive = async (req, res) => {
  try {
    const lives = await Lives.find();
    res.status(200).send(lives);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
};
