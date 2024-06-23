import sportsCoordinator from "../models/sportsCoordinator.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createCoordinator = async (req, res) => {
  try {
    if (req.role !== "admin")
      return res.status(403).send("Unautorized Access. You are not a admin");
    const { email, password, sport, fullName, position } = req.body.user;
    const isSports = await sportsCoordinator.find({ sport: sport });

    const isEmailAvailable = await sportsCoordinator.find({ email: email });
    if (isSports.length > 0) {
      res.status(500).send("Sports coordinator already exists for this sport");
    } else if (isEmailAvailable.length > 0) {
      res
        .status(500)
        .send("email already exists. Please use another email address.");
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
    res.status(501).send(err.message);
  }
};

export const deleteCoordinator = async (req, res) => {
  try {
    if (req.role !== "admin")
      return res.status(403).send("Unautorized Access. You are not a admin");
    const coordinator = await sportsCoordinator.findOneAndDelete(
      {email:req.params.email}
    );
    if (!coordinator) {
      return res.status(404).json({ message: "Coordinator not found" });
    }
    res.status(200).json({ message: "Coordinator deleted successfully" });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

export const getCoordinators = async (req, res) => {
  try {
    const coordinators = await sportsCoordinator.find();
    res.status(200).send(coordinators);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

export const loginCoordinator = async (req, res) => { 
  try {
    const { email, password } = req.body;
    const coordinator = await sportsCoordinator.findOne({ email: email });
    if (!coordinator) {
      return res.status(404).send("Coordinator not found!");
    } else {
      if (bcrypt.compareSync(password, coordinator.password)) {
         const webtoken = jwt.sign(
           {
             id: coordinator._id,
           },
           process.env.TOKEN_KEY
         );

         const { password, ...info } = coordinator._doc;
         const info2 = { ...info, role: "sportsCoordinator" };
         res
           .cookie("accessTokenCoodinator", webtoken, { httpOnly: true })
           .status(200)
           .send(info2);
      } else {
        res.status(401).send("Invalid credentials");
      }

    }
  }
  catch (error) {
    res.status(500).send(error.message);
  }
}
