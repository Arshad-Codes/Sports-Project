import { Sports } from '../models/sports.model.js';

export const createsport = async (req, res) => {
  try {
    const newSport = new Sports({
      ...req.body,
    });

    await newSport.save();

    res.status(201).send('Sport has been created.');
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
