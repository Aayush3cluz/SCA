const CustomError = require("../errors/custom-error");
const validateQueryParams = (req, res, next) => {
  const { order } = req.query;

  if (order && !["asc", "desc"].includes(order)) {
    throw new CustomError("Invalid order query param");
  }

  next();
};

module.exports = validateQueryParams;
