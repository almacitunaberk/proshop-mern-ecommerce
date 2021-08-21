import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @route   GET /api/products
// @desc    Get the all products in the backend
// @acess   Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @route   GET /api/products/:id
// @desc    Fetch a product by its id
// @acess   Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product by its id
// @acess   Private/admin
const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product is removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @route   POST /api/products/
// @desc    Create a product
// @acess   Private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Product',
    price: 0,
    user: req.user._id,
    image: 'sample.png',
    brand: 'Sample brand',
    category: 'Sample cat',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample desc',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @route   PUT /api/products/:id
// @desc    Update a product by its id
// @acess   Private/admin
const updateProductById = asyncHandler(async (req, res) => {
  const { name, price, category, description, brand, image, countInStock } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProductById, getProducts, deleteProductById, createProduct, updateProductById };
