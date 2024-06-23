import Sport from '../models/sports.model.js';

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


export const addTeamMembers = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      return res.status(403).send('Unautorized Access. You are not a admin');
    }
    const sport = await Sport.findById(req.params.id);
    if (!sport) {
      return res.status(404).json({ message: 'Sport not found' });
    }
    for (let i = 0; i < req.body.studentId.length; i++) {
      if (Sport.team.includes(req.body.studentId[i])) {
        return res.status(400).json({ message: 'Member already exists' });
      }else{
        Sport.team.push(req.body.studentId[i]);
      }
    }
    await Sport.save();
    res.status(200).json({ message: 'Team added successfully' });
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
}

export const removeTeamMember = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      return res.status(403).send('Unautorized Access. You are not a admin');
    }
    const sport = await Sport.findById(req.params.id);
    if (!sport) {
      return res.status(404).json({ message: 'Sport not found' });
    }
    const index = Sport.team.indexOf(req.params.studentId);
    if (index > -1) {
      Sport.team.splice(index, 1);
    }
    await Sport.save();
    res.status(200).json({ message: 'Member removed successfully' });
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
}

export const addaTeamMember = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      return res.status(403).send('Unautorized Access. You are not a admin');
    }
    const sport = await Sport.findById(req.params.id);
    if (!sport) {
      return res.status(404).json({ message: 'Sport not found' });
    }
    if (Sport.team.includes(req.params.studentId)) {
      return res.status(400).json({ message: 'Member already exists' });
    }else{
      Sport.team.push(req.params.studentId);
    }
    await Sport.save();
    res.status(200).json({ message: 'Team added successfully' });
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
}

export const getEnrolledStudents = async (req, res) => {
  try {
    const sport = await Sport.findById(req.body.id);
    if (!sport) {
      return res.status(404).send('Sport not found');
    }
    res.status(200).send(sport.enrolledStudents);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
}




