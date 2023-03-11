const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
  createReview,
  getTop5Products,
} = require('../controller/productController');
const { protect, isAdmin } = require('../middleware/authMiddleware.js');

// @desc: Get all products
// @route: GET /api/products
// @access: Public
router.get('/', getAllProducts);

// @desc: Get product by ID
// @route: GET /api/products/:id
// @access: Public
router.get('/:id', getProductById);

// @desc: Delete product by ID
// @route: DELETE /api/products/:id
// @access: Private/admin
router.delete('/:id', protect, isAdmin, deleteProductById);

// @desc: Create product
// @route: POST /api/products
// @access: Private/admin
router.post('/', protect, isAdmin, createProduct);

// @desc: Update a product
// @route: PUT /api/products/:id
// @access: Private/admin
router.put('/:id', protect, isAdmin, updateProduct);

// @desc: Create new review for product
// @route: POST /api/products/:id/reviews
// @access: Private
router.post('/:id/reviews', protect, createReview);

// @desc: Get top 5 products
// @route: GET /api/products/top
// @access: Public
router.get('/get/top', getTop5Products);

module.exports = router;
