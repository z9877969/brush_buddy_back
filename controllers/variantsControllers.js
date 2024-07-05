const fs = require('fs/promises');
const { createError } = require('../helpers');
const { Product, Variant } = require('../models');
const path = require('path');

const getVariantById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const variant = await Variant.findById(id, '-createdAt -updatedAt');
    console.log('variant :>> ', variant);
    res.json(variant);
  } catch (error) {
    next(error);
  }
};

const addVariant = async (req, res, next) => {
  try {
    const { body, params } = req;
    const { prodId } = params;
    const product = Product.findById(prodId);
    if (!product) {
      throw createError(404, 'Product not found');
    }
    const variant = await Variant.create({ ...body, product: prodId });
    await Product.findByIdAndUpdate(prodId, {
      $push: { variants: variant._id },
    });
    const { createdAt, updatedAt, ...rest } = variant._doc;
    res.status(201).json(rest);
  } catch (error) {
    next(error);
  }
};

const updateVariant = async (req, res, next) => {
  try {
    const { body, params } = req;
    const { id } = params;
    const variant = await Variant.findByIdAndUpdate(id, body, {
      new: true,
      projection: { createdAt: 0, updatedAt: 0 },
    });
    if (!variant) {
      throw createError(404, 'Variant not found');
    }
    res.status(200).json(variant);
  } catch (error) {
    next(error);
  }
};

const updateVariantsPopularity = async (req, res, next) => {
  try {
    const { id } = params;
    const { isPopular } = req.body;
    const variant = await Variant.findByIdAndUpdate(
      id,
      { isPopular },
      {
        new: true,
      }
    );
    if (!variant) {
      throw createError(404, 'Variant not found');
    }
    res.json(variant);
  } catch (error) {
    next(error);
  }
};

const deleteVariant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const variant = await Variant.findByIdAndDelete(id, {
      select: '-updatedAt -createdAt',
    });
    res.status(200).json(variant);
  } catch (error) {
    next(error);
  }
};

const updateVariantImages = async (req, res, next) => {
  try {
    const { files } = req;
    if (!files.length) {
      throw createError(400, 'Files not transferred');
    }
    const filenames = files.map((el) => el.filename);
    // ===
    const promises = filenames.map(async (el) => {
      try {
        await fs.rename(
          path.resolve('temp', el),
          path.resolve('public/images', el)
        );
        return path.join('/images', el);
      } catch (error) {
        throw error;
      } finally {
        // fs.unlink(path.resolve('temp', el));
      }
    });
    const promiseData = await Promise.allSettled(promises);
    const newPathes = promiseData.map(({ value }) => value);

    // ===
    const { id } = req.params;
    const variant = await Variant.findByIdAndUpdate(varId, {
      $push: {
        images: { $each: newPathes },
      },
    });
    if (!variant) {
      throw createError(404, 'Variant not found');
    }
    res.json(variant);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getVariantById,
  addVariant,
  updateVariant,
  deleteVariant,
  updateVariantImages,
  updateVariantsPopularity,
};
