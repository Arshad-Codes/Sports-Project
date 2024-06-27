import Announcement from '../models/announcement.model.js';
import Sport from '../models/sports.model.js';
import e from 'express';

export const createAnnouncement = async (req, res) => {
  try {
    const newAnnouncement = new Announcement(req.body);
    await newAnnouncement.save();
    await Sport.updateOne(
      { name: newAnnouncement.sport },
      { $push: { announcements: newAnnouncement._id } }
    );
    res.status(201).send('Announcement has been created.');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

// export const getAnnouncementsforSport = async (req, res) => {
//   //console.log(req.body);
//   try {
//     const announcement_list = await Announcement.find({
//       sport: req.params.sport,
//     });
//     res.status(200).send(announcement_list);
//   } catch (error) {
//     res.status(500).send('Something went wrong');
//   }
// };

export const getAnnouncementsforSport = async (req, res) => {
  // console.log(req.body);
  try {
    const announcement_list = await Announcement.find({
      sport: req.body.sportRole,
    });
    res.status(200).send(announcement_list);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
};


export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).send(announcements);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.body._id);
    await Sport.updateOne(
      { name: announcement.sport },
      { $pull: { announcements: announcement._id } }
    );
    await Announcement.deleteOne({ _id: req.body._id });
    res.status(200).send('Announcement has been deleted.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params._id);
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    const { title, content, sport } =
      req.body;

    announcement.title = title || announcement.title;
    announcement.content = content || announcement.content;
    announcement.sport = sport || announcement.sport;

    await announcement.save();
    // res.status(200).json({ message: 'announcement details updated successfully' });
    res.status(200).send(announcement);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
