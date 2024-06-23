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

export const getAnnouncementsforSport = async (req, res) => {
  //console.log(req.body);
  try {
    const announcement_list = await Announcement.find({
      sport: req.params.sport,
    });
    res.status(200).send(announcement_list);
  } catch (error) {
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
