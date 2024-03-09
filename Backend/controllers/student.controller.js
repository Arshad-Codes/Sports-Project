import Student from "../models/student.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import StudentVerification from "../models/studentVerification.model.js";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

export const register = async (req, res) => {
  try {
    const passHashed = bcrypt.hashSync(req.body.password, 7);
    const newStudent = new Student({
      ...req.body,
      password: passHashed,
    });

    const isAvailable = await Student.findOne({
      email: newStudent.email,
    });

    if (isAvailable) return res.status(409).send("Student already exists.");

    //nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });

    transporter.verify((error, success) => {
      if (error) {
        console.log("Error verifying transporter:", error);
      } else {
        console.log("Transporter is ready to send emails", success);
      }
    });

    newStudent.save().then((result, res) => {
      const currenturl = `http://localhost:${process.env.PORT}/`;
      const uniqueString = uuidv4();

      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: result.email,
        subject: "Verification email for Ruhuna E-Faculty Sports Website",
        html: `<p>Please click here to verify your email address. This link will expire in 2 hours.</p> <p> <a href= ${
          currenturl + "api/student/verify/" + result._id + "/"+ uniqueString
        }> click here to verify </a></p>`,
      };


      const hashedString = bcrypt.hashSync(uniqueString, 7);
      const newStudentVerification = new StudentVerification({
        userId: result._id,
        uniqueString: hashedString,
        createdAt: new Date(),
        expiredAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
      });



      newStudentVerification.save().then((result) => {
        transporter.sendMail(mailOptions,(err,info)=>{
          if(err){
            // return res.status(500).send(err);
            return res.status(500).json({error: err.message});
          }else{
            return res.status(200).send("Email sent to the student for verification.");
          }
        });
      });
    return res.status(200).send("Student registered successfully. Please check your email for verification.");

    });
  } catch (err) {
    console.error(err);
    res.status(500).send("something went wrong.");
  }
};

export const verify = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const uniqueString = req.params.uniqueString;

    const student = await StudentVerification.findOne({
      userId: studentId,
    });

    if (!student) return res.status(404).send("Student not found!");

    const isCorrect = bcrypt.compareSync(uniqueString, student.uniqueString);

    if (!isCorrect) return res.status(400).send("Invalid URL");

    if (student.expiredAt < new Date()) {
      return res.status(400).send("Link expired");
    }

    await StudentVerification.deleteOne({
      userId: studentId,
    });

    await Student.updateOne(
      { _id: studentId },
      {
        verified: true,
      }
    );

    res.status(200).send("Email verified successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("something went wrong");
  }
};


export const login = async (req, res) => {
  try {
    const student = await Student.findOne({
      username: req.body.username,
    });

    if (!student) return res.status(404).send("Student not found!");
    const isCorrect = bcrypt.compareSync(req.body.password, student.password);

    if (!isCorrect) return res.status(400).send("Wrong Password or Username");

    const webtoken = jwt.sign(
      {
        id: student._id,
      },
      process.env.TOKEN_KEY
    );

    const { password, ...info } = student._doc;
    res
      .cookie("accessToken", webtoken, { httpOnly: true })
      .status(200)
      .send(info);
  } catch (err) {
    res.status(500).send("something went wrong");
    //console.log(err);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out successfuly.");
};


