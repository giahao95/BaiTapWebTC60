const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');
const {
  getAllOrders,
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} = require('../controller/orderController');

// @desc: Get all orders
// @route: GET /api/orders
// @access: Private/admin
router.get('/', protect, isAdmin, getAllOrders);

// @desc: Create new order
// @route: POST /api/orders
// @access: Private
router.post('/', protect, createOrder);

// @desc: Get my orders
// @route: GET /api/orders/myorders
// @access: Private
router.get('/myorders', protect, getMyOrders);

// @desc: Get order by id
// @route: GET /api/orders/:id
// @access: Private
router.get('/:id', protect, getOrderById);

// @desc: Update Order To Paid
// @route: PUT /api/orders/:id/pay
// @access: Private/admin (cân nhắc chỉ Private đối với tích hợp thanh toán online)
router.put('/:id/pay', protect, updateOrderToPaid);

module.exports = router;
