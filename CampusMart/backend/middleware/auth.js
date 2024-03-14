const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const user = require("../modals/userModel");

exports.isAuthenticatedUser  = catchAsyncErrors(async (req,res,next) => {
    const {token} = req.cookies;
    // console.log(token);

    if(!token){
        return next(new ErrorHandler("Please login to acces this resource",401));
    }

    const decodeDdata = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await user.findById(decodeDdata.id);
    next();
})

exports.authoriseRoles = (...roles) =>{
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(
                `Role: ${req.user.role} is not alowed to access this resource`,403
            ));
        }
        next();
    }
}