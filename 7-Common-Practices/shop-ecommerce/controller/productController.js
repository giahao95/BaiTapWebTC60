const productModel = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const { syncIndexes } = require('../models/productModel');

// Get all products
const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;
  const keyword = req.query.keyword;
  const searchQuery = keyword ? { name: { $regex: keyword } } : {};

  const totalProduct = await productModel.countDocuments({ ...searchQuery });

  const products = await productModel
    .find({ ...searchQuery })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({
    products,
    totalProduct,
    page,
  });
});

// Get product by id
const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await productModel.findOne({ _id: req.params.id });
    res.status(200).json(product);
  } catch (error) {
    throw new Error('Can not found');
  }
});

// Delete product by id
const deleteProductById = asyncHandler(async (req, res) => {
  try {
    const product = await productModel.deleteOne({ _id: req.params.id });
    res.status(200).json(product);
  } catch (error) {
    throw new Error('Can not found id to delete');
  }
});

// Create product
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    brand,
    category,
    description,
    price,
    countInStock,
    rating,
  } = req.body;

  const productExists = await productModel.findOne({ name });
  if (productExists) {
    res.status(400);
    throw new Error('product already exists');
  }

  const newProduct = await productModel.create({
    user: req.user._id,
    name,
    image,
    brand,
    category,
    description,
    price,
    countInStock,
    rating,
  });

  if (newProduct) {
    res.status(200).json(newProduct);
  } else {
    res.status(401);
    throw new Error('Can not create new product');
  }
});

// Update a product
const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, brand, category, description, price, countInStock } =
    req.body;

  const updatedProduct = await productModel.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $set: {
        name,
        image,
        brand,
        category,
        description,
        price,
        countInStock,
      },
    }
  );

  if (updatedProduct) {
    res.status(200).json(updatedProduct);
  } else {
    res.status(401);
    throw new Error("Product can't update");
  }
});

// Create new review for product
const createReview = asyncHandler(async (req, res) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    res.status(401);
    throw new Error('Product not found');
  }

  product.reviews.push({
    user: req.user._id,
    name: req.user.name,
    comment: req.body.comment,
    rating: req.body.rating,
  });

  // Số lượng review
  product.numReviews = product.reviews.length;

  // Trung bình rating của tất cả reviews
  product.rating =
    product.reviews.reduce((averaged, review) => {
      return averaged + review.rating;
    }, 0) / product.numReviews;

  const reviewsProduct = await product.save();
  if (reviewsProduct) {
    res.status(200).json(reviewsProduct);
  } else {
    res.status(401);
    throw new Error("Review can't create");
  }
});

// Get top 5 products
const getTop5Products = asyncHandler(async (req, res) => {
  const topProducts = await productModel.find({}).sort({ rating: -1 }).limit(5);

  console.log('a');
  if (topProducts) {
    res.status(200).json(topProducts);
  } else {
    res.status(401);
    throw new Error('Can not found');
  }
});

module.exports = {
  getAllProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
  createReview,
  getTop5Products,
};
