const errorHandler = (err, req, res, next) => {
  res.status(500).send({
    errors: [{ message: "Something went wrong" }],
  });
};
module.exports = errorHandler;
