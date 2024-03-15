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

export const getSports = async (req, res) => {
  try {
    const sports_list = await Sports.find({});
    res.status(200).send(sports_list);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};
