import { Sports } from '../models/sports.model.js';
import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: 'djoejgcod',
//   api_key: '724676787828926',
//   api_secret: 'TPraz15JdEGbKHdfOEOUb4etmaI',
// });

export const createsport = async (req, res) => {
  try {
    

    const newSport = new Sports({
      ...req.body
    });

    await newSport.save();

    res.status(201).send('Sport has been created.');
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
