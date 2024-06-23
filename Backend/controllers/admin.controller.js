import Admin from '../models/admin.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
    const info2 = { ...info, role: 'admin'};
    res
      .cookie('accessToken', webtoken, { httpOnly: true })
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

