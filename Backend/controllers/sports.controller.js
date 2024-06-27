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
      } else {
        Sport.team.push(req.body.studentId[i]);
      }
    }
    await Sport.save();
    res.status(200).json({ message: 'Team added successfully' });
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

export const addaTeamMember = async (req, res) => {
  try {
    // if (req.role !== 'admin') {
    //   return res.status(403).send('Unautorized Access. You are not a admin');
    // }
    const sport = await Sport.findById(req.body.data.selectedSport);
    if (!sport) {
      return res.status(404).json({ message: 'Sport not found' });
    }
    if (sport.team.includes(req.body.data.selectedStudent._id)) {
      return res.status(400).json({ message: 'Member already exists' });
    } else {
      sport.team.push(req.body.data.selectedStudent._id);
    }
    await sport.save();
    res.status(200).json({ message: 'Team member added successfully' });
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

export const removeaTeamMember = async (req, res) => {
  try {
    console.log(req.body);
    const sport = await Sport.findById(req.body.sportId);
    if (!sport) {
      return res.status(404).json({ message: 'Sport not found' });
    }
    const index = sport.team.indexOf(req.body.studentId);
    if (index > -1) {
      sport.team.splice(index, 1);
    }
    await sport.save();
    res.status(200).json({ message: 'Member removed successfully' });
  } catch (error) {
    res.status(500).send('Something went wrong', error);
  }
};

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
};

export const updateSports = async (req, res) => {
  try {
    const sport = await Sport.findById(req.params._id);
    if (!sport) {
      return res.status(404).json({ message: 'Sport not found' });
    }

    const { name, description } = req.body;

    sport.name = name || sport.name;
    sport.description = description || sport.description;

    await sport.save();
    // res.status(200).json({ message: 'Sport details updated successfully' });
    res.status(200).send(sport);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
export const getEnrolledStudentsbyname = async (req, res) => {
  try {
    const sport = await Sport.find({ name: req.body.name });
    if (!sport) {
      return res.status(404).send('Sport not found');
    }

    res.status(200).send(sport[0].enrolledStudents);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

// Get announcements for a specific sport
export const getSportAnnouncements = async (req, res) => {
  try {
    const sportId = req.params.sportId;
    const sport = await Sport.findById(sportId).select('announcements');
    if (!sport) return res.status(404).send('Sport not found!');
    res.status(200).send(sport.announcements);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};
