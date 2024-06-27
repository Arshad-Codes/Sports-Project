import Admin from '../models/admin.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Excuse from '../models/excuse.model.js';
import Student from '../models/student.model.js';
import nodemailer from 'nodemailer';

export const register = async (req, res) => {
  try {
    const passHashed = bcrypt.hashSync(req.body.password, 7);
    const newAdmin = new Admin({
      ...req.body,
      password: passHashed,
    });

    await newAdmin.save();
    res.status(201).send('Admin has been created.');
  } catch (err) {
    res
      .status(500)
      .send('something went wrong. try again with valid username, password ');
  }
};

export const login = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      username: req.body.username,
    });

    if (!admin) return res.status(404).send('Admin not found!');
    const isCorrect = bcrypt.compareSync(req.body.password, admin.password);

    if (!isCorrect) return res.status(400).send('Wrong Username or Password');

    const webtoken = jwt.sign(
      {
        id: admin._id,
      },
      process.env.TOKEN_KEY
    );

    const { password, ...info } = admin._doc;
    const info2 = { ...info, role: 'admin' };
    res
      .cookie('accessToken', webtoken, { httpOnly: true, sameSite: 'None' })
      .status(200)
      .send(info2);
  } catch (err) {
    res.status(500).send('something went wrong');
    //console.log(err);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie('accessToken', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .send('User has been logged out successfuly.');
};

export const getAdmin = async (req, res) => {
  try {
    const admin_list = await Admin.find({});
    res.status(200).send(admin_list);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

export const updateAdmin = async (req, res) => {
  const _id = req.params.adminId;
  const updatedAdminData = req.body;
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(_id, updatedAdminData, {
      new: true,
    });

    if (!updatedAdmin) {
      return res.status(404).send('Admin not found!');
    }

    res.json(updatedAdmin);
    res.status(200).send(info);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

export const approveExcuse = async (req, res) => {
  try {
    const excuse = await Excuse.findByIdAndUpdate(req.body.excuseid, {
      status: 'approved',
    });
    if (!excuse) {
      return res.status(404).send('Excuse not found!');
    }
    const student = await Student.findById(excuse.studentId);
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

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: excuse.reciever,
      subject: excuse.subject,
      text: `This is to inform that this excuse has been reccomended and forwarded to your consideration. 
      student Name: ${student.firstName} ${student.lastName}
      student ID: ${student.regNo}
      Reason: ${excuse.reason}
      Date: ${excuse.date}
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send('Error sending email:', error);
      } else {
        return res.status(200).send('Email sent successfully');
      }
    });
  } catch (error) {
    return res.status(500).send('Something went wrong', error);
  }
};

export const disapproveExcuse = async (req, res) => {
  try {
    const excuse = await Excuse.findByIdAndUpdate(req.body.excuseid, {
      status: 'disapproved',
    });
    if (!excuse) {
      return res.status(404).send('Excuse not found!');
    }
    return res.status(200).send('Excuse disapproved successfully');
  } catch (error) {
    return res.status(500).send('Something went wrong');
  }
};

export const getExcuses = async (req, res) => {
  try {
    const excuses = await Excuse.find();

    // Map over each excuse to fetch the corresponding student details
    const excusesWithStudentInfo = await Promise.all(
      excuses.map(async (excuse) => {
        const student = await Student.findById(excuse.studentId).exec();
        // Combine the excuse object with student details
        return {
          ...excuse.toObject(), // Convert Mongoose document to plain JavaScript object
          studentName: student
            ? `${student.firstName} ${student.lastName}`
            : 'Unknown',
          regNo: student ? student.regNo : 'Unknown',
        };
      })
    );

    res.status(200).send(excusesWithStudentInfo);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};
