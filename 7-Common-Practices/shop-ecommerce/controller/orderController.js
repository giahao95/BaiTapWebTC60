const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

// Get all orders
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await orderModel.find({});
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(400);
    throw new Error('Order can not found');
  }
});

// Get my orders
const getMyOrders = asyncHandler(async (req, res) => {
  const order = await orderModel.findOne({ user: req.user._id });
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(400);
    throw new Error('Order can not found');
  }
});

// Get order by id
const getOrderById = asyncHandler(async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const order = await orderModel.findById(req.params.id);
      res.status(200).json(order);
    } catch (e) {
      res.status(400);
      throw new Error('Order not found');
    }
  } else {
    res.status(400);
    throw new Error('Id dont valid');
  }
});

// Create new order
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, shippingPrice, isPaid } =
    req.body;

  for (let i = 0; i < orderItems.length; i++) {
    const result = await productModel.findById(orderItems[i].product);
    orderItems[i].product = result._id;
    orderItems[i].name = result.name;
    orderItems[i].price = result.price;
    orderItems[i].image = result.image;
    result.countInStock -= 1;
    await result.save();
  }

  const sumPrice = orderItems.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

  const newOrder = await orderModel.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    isPaid,
    totalPrice: sumPrice + shippingPrice,
  });

  if (newOrder) {
    res.status(200).json(newOrder);
  } else {
    res.status(401);
    throw new Error('Order can not create');
  }
});

// Update order to paid
const updateOrderToPaid = asyncHandler(async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const order = await orderModel.findById(req.params.id);
    if (
      order &&
      (order.paymentMethod === 'online' || req.user.isAdmin === true)
    ) {
      order.isPaid = true;
      let { id, status, email_address, update_time } = order.paymentResult;
      id = req.params.id;
      status = 'Đã thanh toán';
      email_address = req.user.email;
      update_time = new Date().toISOString();
      const updatePaid = await order.save();
      console.log(updatePaid);
      res.status(200).json(updatePaid);
    } else {
      res.status(401);
      throw new Error('Payment error');
    }
  } else {
    res.status(400);
    throw new Error('Id dont valid');
  }
});

module.exports = {
  getAllOrders,
  createOrder,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
};
