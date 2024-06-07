const Joi = require('joi');
const { isValidObjectId } = require('mongoose');
const { products } = require('../constants');

const { AGE, USER_TYPE } = products;

// Схема для об'єкта з полями title і list
const itemsWithTitleSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  items: Joi.array().items(Joi.string()).required(),
});

// Схема для об'єкта з полем paragraph
const paragraphSchema = Joi.object({
  id: Joi.string().required(),
  paragraph: Joi.string().required(),
});

const productAddingSchema = Joi.object({
  title: Joi.string().required(),
  subtitle: Joi.string().required(),
  description: Joi.array().items(
    Joi.alternatives().try(itemsWithTitleSchema, paragraphSchema)
  ),
  recomendation: Joi.string().required(),
  category: Joi.string()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'MongoDB ObjectId')
    .required(),
  maker: Joi.string()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'MongoDB ObjectId')
    .required(),
  userType: Joi.array()
    .items(
      Joi.string().valid(USER_TYPE.ADULT, USER_TYPE.CHILD, USER_TYPE.ANIMAL)
    )
    .default([]),
  age: Joi.array()
    .items(Joi.string().valid(AGE['0TO3'], AGE['4TO6'], AGE['6TO12']))
    .default([]),
  images: Joi.array()
    .items(Joi.object({ url: Joi.string() }))
    .default([]),
});

const productUpdatingSchema = Joi.object({
  title: Joi.string(),
  subtitle: Joi.string(),
  description: Joi.array().items(
    Joi.alternatives().try(itemsWithTitleSchema, paragraphSchema)
  ),
  recomendation: Joi.string(),
  category: Joi.string().custom((value, helpers) => {
    if (!isValidObjectId(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }, 'MongoDB ObjectId'),
  maker: Joi.string().custom((value, helpers) => {
    if (!isValidObjectId(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }, 'MongoDB ObjectId'),
  userType: Joi.array()
    .items(
      Joi.string().valid(USER_TYPE.ADULT, USER_TYPE.CHILD, USER_TYPE.ANIMAL)
    )
    .default([]),
  age: Joi.array()
    .items(Joi.string().valid(AGE['0TO3'], AGE['4TO6'], AGE['6TO12']))
    .default([]),
  // images: Joi.array()
  //   .items(Joi.object({ url: Joi.string() }))
  //   .default([]),
});

module.exports = {
  productAddingSchema,
  productUpdatingSchema,
};
