const { Schema, model } = require('mongoose');
const { products } = require('../constants');

const { USER_TYPE, WATERMARK, AGE } = products;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: Array,
      required: false,
      default: [],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    maker: {
      type: Schema.Types.ObjectId,
      ref: 'maker',
      required: true,
    },
    userType: {
      type: [
        {
          type: String,
          enum: [USER_TYPE.ADULT, USER_TYPE.CHILD, USER_TYPE.ANIMAL],
        },
      ],
      default: [],
    },
    age: {
      type: [
        {
          type: String,
          enum: [AGE['0TO3'], AGE['4TO6'], AGE['6TO12']],
        },
      ],
      default: [],
    },
    variants: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'variant',
        },
      ],
      default: [],
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports.Product = model('product', productSchema);

const p = {
  title: '+',
  description: [],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
  maker: {
    type: Schema.Types.ObjectId,
    ref: 'maker',
    required: true,
  },
  userType: {
    type: [
      {
        type: String,
        enum: [USER_TYPE.ADULT, USER_TYPE.CHILD, USER_TYPE.ANIMAL],
      },
    ],
    default: [],
  },
  age: {
    type: [
      {
        type: String,
        enum: [AGE['0TO3'], AGE['4TO6'], AGE['6TO12']],
      },
    ],
    default: [],
  },
  watermark: {
    type: [
      {
        type: String,
        enum: [WATERMARK.WOW, WATERMARK.SALE],
      },
    ],
    default: [],
  },
  variants: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'variant',
      },
    ],
    default: [],
    required: false,
  },
};
