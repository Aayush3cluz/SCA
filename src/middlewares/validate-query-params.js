const validateQueryParams = (req, res, next) => {
  const { order } = req.query;

  if (order && !["asc", "desc"].includes(order)) {
    return res.status(400).send({
      errors: [{ message: "Invalid order query param" }],
    });
  }

  next();
};

module.exports = validateQueryParams;
