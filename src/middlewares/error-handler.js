const CustomError = require("../errors/custom-error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.send([{ message: "Internal Server Error" }]);
  }
  console.log(err);
  res.status(500).send(err.serializeErrors());
};

module.exports = errorHandler;
