import sportsCoordinator from '../models/sportsCoordinator.model.js';

export const createCoordinator = async (req, res) => {
  try {
    if (req.role !== 'admin')
      return res.status(403).send('Unautorized Access. You are not a admin');
    const { email, password, fullName, position, sport } = req.body;
    const isSports = await sportsCoordinator.find({ sport: sport });
    const isEmailAvailable = await sportsCoordinator.find({ email: email });
    if (isSports) {
      res.status(500).send('Sports coordinator already exists for this sport');
    } else if (isEmailAvailable) {
      res
        .status(500)
        .send('email already exists. Please use another email address.');
    } else {
      const newCoordinator = new sportsCoordinator({
        fullName: fullName,
        email: email,
        password: bcrypt.hashSync(password, 10),
        position: position,
        sport: sport,
      });
      const savedCoordinator = await newCoordinator.save();
      res.status(200).json(savedCoordinator);
    }
  } catch (err) {
    res.status(501).send('something went wrong');
  }
};

export const deleteCoordinator = async (req, res) => {
  try {
    if (req.role !== 'admin')
      return res.status(403).send('Unautorized Access. You are not a admin');
    const coordinator = await sportsCoordinator.findByIdAndDelete(
      req.params.id
    );
    if (!coordinator) {
      return res.status(404).json({ message: 'Coordinator not found' });
    }
    res.status(200).json({ message: 'Coordinator deleted successfully' });
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

export const getCoordinators = async (req, res) => {
  try {
    const coordinators = await sportsCoordinator.find();
    res.status(200).send(coordinators);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};
