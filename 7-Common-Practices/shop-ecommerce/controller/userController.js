const userModel = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Đăng ký user mới
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const newUser = await userModel.create({ name, email, password });
  if (newUser) {
    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: jwt.sign({ id: newUser._id }, 'masobimat', {
        expiresIn: '1d',
      }),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Đăng nhập vào hẽ thống
const authLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  console.log(user.password, password);
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: jwt.sign({ id: user._id }, 'masobimat', {
        expiresIn: '1d',
      }),
    });
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }
});

// Lấy thông tin của user
const getUserProfile = asyncHandler((req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(404);
    throw new Error('User info not found');
  }
});

// Cập nhật thông tin user
const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await userModel.findById(req.user._id);
  console.log(user);
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) user.password = password;
    const updateUser = await user.save();
    res.status(200).json(updateUser);
  } else {
    res.status(404);
    throw new Error('User info not found');
  }
});

// Lấy thông tin tất cả user
const getAllUser = asyncHandler(async (req, res) => {
  const users = await userModel.find({});
  res.status(200).json(users);
});

// Xóa user theo id
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  if (mongoose.Types.ObjectId.isValid(userId)) {
    const { deletedCount } = await userModel.deleteOne({ _id: userId });
    if (deletedCount) {
      res.status(200).send('Successful delete');
    } else {
      res.status(404);
      throw new Error('User info not found to delete');
    }
  } else {
    throw new Error('Id format is not correct');
  }
});

// Lấy thông tin user theo id
const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  if (mongoose.Types.ObjectId.isValid(userId)) {
    const user = await userModel.findById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      throw new Error('User not found');
    }
  } else {
    throw new Error('Id format is not correct');
  }
});

// Cập nhật user theo id
const updateUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { name, email, isAdmin } = req.body;

  if (mongoose.Types.ObjectId.isValid(userId)) {
    const user = await userModel.findById(userId);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.isAdmin = isAdmin || user.isAdmin;
      const newUser = await user.save();
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      throw new Error('User not found');
    }
  } else {
    throw new Error('Id format is not correct');
  }
});

module.exports = {
  registerUser,
  authLogin,
  getUserProfile,
  updateUserProfile,
  getAllUser,
  deleteUser,
  getUserById,
  updateUserById,
};
