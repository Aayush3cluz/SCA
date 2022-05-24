const CustomError = require("../errors/custom-error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(500).send(err.serializeErrors());
  }
  console.log(err);

  res.status(500).send([{ message: "Internal Server Error" }]);
};

module.exports = errorHandler;
