var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/user.model');
const {
  registerValidation,
  loginValidation,
} = require('../validation/validation');

router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExists = await UserModel.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send('Email da ton tai');

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const user = await newUser.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userLogin = await UserModel.findOne({ email: req.body.email });
  if (!userLogin) return res.status(400).send('Email chua duoc dang ky');

  const isLoginPassword = await bcrypt.compare(
    req.body.password,
    userLogin.password
  );
  if (!isLoginPassword) return res.status(400).send('Mat khau khong dung');

  const token = jwt.sign({ _id: userLogin._id }, 'private-key');
  res.header('auth-token', token).send(token);
});

module.exports = router;
