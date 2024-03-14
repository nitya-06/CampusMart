const User = require("../modals/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtTokens");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  // console.log("second-third");
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder:"avatar",
    width:150,
    crop:"scale",
  })
  // console.log("second-third");
  // console.log(req.body);
  const { name, email, password } = req.body;
  // console.log(name);
  // console.log("third");
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  // console.log("third");

  sendToken(user, 201, res);
});

// login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password"), 400);
  }
  const user = await User.findOne({ email }).select("+password"); // if email:email then we can just write email adn +password to include password in user
  if (!user) {
    return next(new ErrorHandler("Invalide Email or Password"), 401);
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalide Email or Password"), 401);
  }

  sendToken(user, 200, res);
});

// logout user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out successfully",
  });
});

// forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  // get resetpasswordtoken
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false }); // to save resetpasswordtoken and expiration

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requsted it, then please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce password Recovery`,
      message: message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false }); // to reset  resetpasswordtoken and expiration

    return next(new ErrorHandler(err.message, 500));
  }
});

// reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("Reset Password token is invalid or expired", 404)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password dose not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save(); // to reset  resetpasswordtoken and expiration
  sendToken(user, 200, res);
});

// get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update user password
exports.updateUserPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is Incorrect"), 400);
  }
  if (req.body.newPassword != req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match"), 400);
  }

  user.password = req.body.newPassword;

  await user.save();
  sendToken(user, 200, res);
});

// update user profile
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  if(req.body.avatar!==""){
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatar",
      width: 150,
      crop: "scale",
    });
    newUserData.avatar = {
      public_id:myCloud.public_id,
      url:myCloud.secure_url
    }

  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// get all users -- admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// get single users -- admin
exports.getSingleUser = catchAsyncErrors(async (req,res,next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler(`User does not exsts with Id: ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      user,
    });
})

// update user role - admin
exports.updateUserProfileAdmin = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role:req.body.role
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

      if (!user) {
      return next(
        new ErrorHandler(`User does not exsts with Id: ${req.params.id}`, 404)
      );
    }


  res.status(200).json({
    success: true,
    user,
  });
});

// delete user  - admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  // we will remove cloudinary
    if (!user) {
      return next(
        new ErrorHandler(`User does not exsts with Id: ${req.params.id}`, 404)
      );
    }
    // coudinary image delete
     const imageId = user.avatar.public_id;
     await cloudinary.v2.uploader.destroy(imageId);

    await User.deleteOne({_id:req.params.id});
  res.status(200).json({
    success: true,
    message: "User deleted successfully"
  });
});
