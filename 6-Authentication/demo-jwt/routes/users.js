var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
const {
  registerValication,
  loginValidation,
} = require('../validation/validation');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', async (req, res) => {
  // Validation user
  const { error } = registerValication(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check email exists in db
  const emailExists = await UserModel.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send('Email da ton tai');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Save user in db
  const newUser = new UserModel();
  newUser.name = req.body.name;
  newUser.email = req.body.email;
  newUser.password = hashPassword;

  try {
    const user = await newUser.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(400);
  }
});

router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userLogin = await UserModel.findOne({ email: req.body.email });
  if (!userLogin) return res.status(400).send('Email chua duoc dang ky');

  const isPasswordLogin = await bcrypt.compare(
    req.body.password,
    userLogin.password
  );
  if (!isPasswordLogin) return res.status(400).send('Mat khau khong dung');

  const token = jwt.sign({ _id: userLogin._id }, 'private-key');
  res.header('auth-token', token).send(token);
});

router.get('/', authMiddleware, (req, res) => {
  console.log(req.user);
  res.send('Hello');
});

module.exports = router;
