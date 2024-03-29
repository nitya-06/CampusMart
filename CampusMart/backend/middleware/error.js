const ErrorHandler = require("../utils/errorhandler");

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // handling mongodb errors
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(message,400);
    }
    
    // mongoose duplicate key error
    if(err.code == 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message,400);
    }

    // wrong jwt error
    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is Invalid, Try again}`;
        err = new ErrorHandler(message,400);
    }

    // jwt  expireerror
    if(err.name === "TokenExpiredError"){
        const message = `Json Web Token is Expired, Try again}`;
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message: err.message
        // error: err
        // we could have used err.stack to get the stack of error caused 
    })
}