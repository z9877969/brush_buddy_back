const { Schema, model } = require('mongoose');

const contentSchema = new Schema(
  {
    blockName: {
      type: String,
      default: 'mainPage',
    },
    aboutUrl: {
      type: String,
      default: '',
    },
    socialLinks: {
      type: Array,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports.Content = model('content', contentSchema);
