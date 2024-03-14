class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;

// The ErrorHandler class inherits from the Error class in JavaScript and is used for creating custom error instances with specified status codes and messages,
// it also keeps stack track of chain of calls causing this error
