const { ctrlWrapper } = require('../decorators');
const { createError } = require('../helpers');
const { Content } = require('../models/content');

const getBlockData = async (req, res) => {
  const { blockName } = req.params;
  const { aboutUrl, socialLinks } = req.query;

  const data = await Content.findOne({ blockName });

  let response = {};

  if (aboutUrl) {
    response.aboutUrl = data.aboutUrl;
  }
  if (socialLinks) {
    response.socialLinks = data.socialLinks;
  }

  if (!aboutUrl && !socialLinks) {
    response = data;
  }

  res.json(response);
};

const updateBlockData = async (req, res) => {
  const { blockName } = req.params;
  const { aboutUrl, socialLinks } = req.body;

  const dataToUpdate = {};

  if (aboutUrl) {
    dataToUpdate.aboutUrl = aboutUrl;
  }

  if (socialLinks) {
    dataToUpdate.socialLinks = socialLinks;
  }

  const blockData = await Content.findOneAndUpdate(
    {
      blockName, // Додатковий фільтр за blockName
    },
    dataToUpdate,
    {
      new: true,
    }
  );

  if (!blockData) {
    throw createError(404, `Block ${blockName} not found`);
  }

  res.json(blockData);
};

module.exports = {
  updateBlockData: ctrlWrapper(updateBlockData),
  getBlockData: ctrlWrapper(getBlockData),
};
