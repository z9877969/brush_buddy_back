const { Schema, model } = require('mongoose');
const { WATERMARK } = require('../constants/products');

const variantSchema = new Schema(
  {
    isPopular: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '',
    },
    flavor: {
      type: String,
      default: '',
    },
    volume: {
      type: String,
      default: '',
    },
    marker: {
      type: String,
      default: '#abc123',
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      required: false,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
    },
    watermark: {
      type: String,
      enum: [WATERMARK.WOW, WATERMARK.SALE, ''],
      default: '',
    },
    images: {
      type: [String],
      required: false,
      default: [],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

variantSchema.pre('findOneAndUpdate', function () {
  this.setOptions({ new: true });
});

module.exports.Variant = model('variant', variantSchema);
