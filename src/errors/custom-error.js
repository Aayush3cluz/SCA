class CustomError extends Error {
  constructor(message = "", ...args) {
    super(message, ...args);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}
module.exports = CustomError;
