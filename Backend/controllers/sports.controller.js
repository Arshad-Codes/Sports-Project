
import { Sports } from "../models/sports.model.js";

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'djoejgcod', 
  api_key: '724676787828926', 
  api_secret: 'TPraz15JdEGbKHdfOEOUb4etmaI' 
});

export const createsport = async(req, res) => {
    try{
        const{name, description } =req.body;

        if (!req.file) {
            return res.status(400).json({ message: "No image file provided"});
        }

      // Upload image --> Cloudinary 
      const result = await cloudinary.uploader.upload(req.file.path);
  
        const newSport = new Sports({
            name: name,
            description: description,
            imageUrl: result.secure_url,
        });

        await newSport.save();

        res.status(201).send("Sport has been created.");
    }
    catch(error){
        console.error(error);
        res.status(500).send("somthing went wrong");
    }
};