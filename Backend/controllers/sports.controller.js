import { Sport } from '../models/sports.model.js';



export const createsport = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      return res.status(403).send('Unautorized Access. You are not a admin');
    }
    const newSport = new Sport({
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
    const sports_list = await Sport.find({});
    res.status(200).send(sports_list);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

export const deleteSport = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      return res.status(403).send('Unautorized Access. You are not a admin');
    }
    const sport = await Sport.findByIdAndDelete(req.params.id);
    if (!sport) {
      return res.status(404).json({ message: 'Sport not found' });
    }
    res.status(200).json({ message: 'Sport deleted successfully' });
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};
