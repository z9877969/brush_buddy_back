const authenticate = (req, res, next) => {
  try {
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
