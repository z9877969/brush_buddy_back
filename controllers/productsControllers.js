const fs = require('fs/promises');
const { createError } = require('../helpers');
const { Product, Variant } = require('../models');
const path = require('path');

const getAllProducts = async (_, res, next) => {
  try {
    const products = await Product.find({}, '-createdAt -updatedAt')
      .populate('category')
      .populate('maker')
      .populate('variants', '-createdAt -updatedAt');
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId, '-createdAt -updatedAt')
      .populate('category')
      .populate('maker')
      .populate('variants', '-createdAt -updatedAt');
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const { _doc } = await Product.create(req.body);
    const { createdAt, updatedAt, ...product } = _doc;
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      projection: { createdAt: 0, updatedAt: 0, variants: 0 },
    })
      .populate('category')
      .populate('maker');
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deleteProduct) {
      throw createError(404, 'Product not found');
    }
    await Variant.deleteMany({ product: deletedProduct._id });
    res.json({ _id: deleteProduct._id });
  } catch (error) {
    next(error);
  }
};

const getProductVariantsList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { variants } = await Product.findById(id, 'variants').populate(
      'variants',
      '-createdAt -updatedAt'
    );
    res.json(variants);
  } catch (error) {
    next(error);
  }
};

const getPopularProducts = async (req, res, next) => {
  try {
    const variants = await Variant.find(
      { isPopular: true },
      '-createdAt -updatedAt'
    ).populate('product');

    const normalizedProducts = variants.map(
      ({ _doc: { product, ...variant } }) => ({
        ...product._doc,
        variants: [variant],
      })
    );

    res.json(normalizedProducts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductVariantsList,
  getPopularProducts,
};
