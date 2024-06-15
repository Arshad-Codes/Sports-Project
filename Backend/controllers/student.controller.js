import Student from '../models/student.model.js';
import Sport from '../models/sports.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import StudentVerification from '../models/studentVerification.model.js';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

export const register = async (req, res) => {
  try {
    const passHashed = bcrypt.hashSync(req.body.password, 7);
    const newStudent = new Student({
      ...req.body,
      password: passHashed,
    });

    const isEmailAvailable = await Student.findOne({ email: newStudent.email });
    const isRegNoAvailable = await Student.findOne({ regNo: newStudent.regNo });
    const isNicNoAvailable = await Student.findOne({ nicNo: newStudent.nicNo });

    if (isEmailAvailable) {
      return res.status(409).send('Email already exists.');
    }
    if (isRegNoAvailable) {
      return res.status(409).send('Registration number already exists.');
    }
    if (isNicNoAvailable) {
      return res.status(409).send('NIC number already exists.');
    }

    //nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });

    transporter.verify((error, success) => {
      if (error) {
        console.log('Error verifying transporter:', error);
      } else {
        console.log('Transporter is ready to send emails', success);
      }
    });

    try {
      newStudent.save().then((result, res) => {
        const currenturl = `https://ruhunasports.onrender.com/`;
        const uniqueString = uuidv4();

        const mailOptions = {
          from: process.env.AUTH_EMAIL,
          to: result.email,
          subject: 'Verification email for Ruhuna E-Faculty Sports Website',
          html: `<p>Please click here to verify your email address. This link will expire in 2 hours.</p> <p> <a href= ${
            currenturl + 'api/student/verify/' + result._id + '/' + uniqueString
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
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              // return res.status(500).send(err);
              return res.status(500).json({ error: err.message });
            } else {
              return res
                .status(200)
                .send('Email sent to the student for verification.');
            }
          });
        });
      });
      return res
        .status(200)
        .send(
          'Student registered successfully. Please check your email for verification.'
        );
    } catch (err) {
      res.status(500).send(err.message);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const verify = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const uniqueString = req.params.uniqueString;

    const student = await StudentVerification.findOne({
      userId: studentId,
    });

    if (!student) return res.status(404).send('Student not found!');

    const isCorrect = bcrypt.compareSync(uniqueString, student.uniqueString);

    if (!isCorrect) return res.status(400).send('Invalid URL');

    if (student.expiredAt < new Date()) {
      return res.status(400).send('Link expired');
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

    res.status(200).send('Email verified successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send('something went wrong');
  }
};

export const login = async (req, res) => {
  try {
    const student = await Student.findOne({
      email: req.body.email,
    });

    if (!student) return res.status(404).send('Student not found!');
    const isCorrect = bcrypt.compareSync(req.body.password, student.password);

    if (!isCorrect) return res.status(400).send('Wrong Username or Password');

    const webtoken = jwt.sign(
      {
        id: student._id,
      },
      process.env.TOKEN_KEY
    );

    const { password, ...info } = student._doc;
    const info2 = { ...info, role: 'student' };
    res
      .cookie('accessTokenStudent', webtoken, { httpOnly: true })
      .status(200)
      .send(info2);
  } catch (err) {
    res.status(500).send('something went wrong');
    //console.log(err);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie('accessTokenStudent', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .send('User has been logged out successfuly.');
};

export const getStudents = async (req, res) => {
  try {
    const student_list = await Student.find({});
    res.status(200).send(student_list);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

export const editDetails = async (req, res) => {
  try {
    const student = await Student.findOne({
      _id: req.params.studentId,
    });

    if (!student) {
      return res.status(404).send('Student not found!');
    }
    const isRegNoAvailable = await Student.findOne({ regNo: student.regNo });
    const isNicNoAvailable = await Student.findOne({ nicNo: student.nicNo });

    if (isEmailAvailable) {
      return res.status(409).send('Email already exists.');
    }
    if (isRegNoAvailable) {
      return res.status(409).send('Registration number already exists.');
    }
    if (isNicNoAvailable) {
      return res.status(409).send('NIC number already exists.');
    }

    student.firstName = req.body.firstName || student.firstName;
    student.lastName = req.bodylastName || student.lastName;
    student.dateofBirth = req.body.dateofBirth || student.dateofBirth;
    student.achievements = req.body.achievements || student.achievements;
    student.regNo = req.body.regNo || student.regNo;
    student.nicNo = req.body.nicNo || student.nicNo;

    await student.save();

    res.status(200).send('Student details updated successfully');
  } catch (error) {}
};

export const enrollToSport = async (req, res) => {
  try {
    const studentId = req.body.studentId;
    const sportId = req.body.sportId;

    const student = await Student.findOne({
      _id: studentId,
    });
    if (!student) return res.status(404).send('Student not found!');
    student.enrolledSports.push(sportId);
    await student.save();
    await Sport.updateOne(
      { _id: sportId },
      {
        $push: { enrolledStudents: studentId },
      }
    );

    res.status(200).send('Enrolled successfully');
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

export const getEnrolledSports = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findOne({
      _id: studentId,
    });
    if (!student) return res.status(404).send('Student not found!');
    const sports = await Sport.find({
      _id: { $in: student.enrolledSports },
    });
    res.status(200).send(sports);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};
