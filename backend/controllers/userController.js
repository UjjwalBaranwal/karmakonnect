const { promisify } = require("util"); // builtin util module for promising... extracting promisify from the util
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const crypto = require("crypto");
const { env } = require("process");
require('dotenv').config();

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookiOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookiOption.secure = true;

  user.password = undefined;

  res.cookie("jwt", token, cookiOption);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  //   const newUser = await User.create(req.body); /// this line is flaw because if someone wants to enter as the admin then just he/she could assign themselves as the admin and can enter
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    gender: req.body.gender,
    phoneNumber: req.body.phoneNumber,
  });

  createAndSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //   steps
  /////////// 1 check if email and password exist
  if (!email || !password) {
    return next(new AppError("please provide email or password", 400));
  }
  //////////  2 chack if user exist and password is correct
  const user = await User.findOne({ email }).select("+password"); // if user is not there then it takes to much time and cant proceed further so i put correct statement in the if col
  console.log(user);
  //   const correct = await user.correctPassword(password, user.password);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Email id or Password is incorrect"), 401);
  }
  createAndSendToken(user, 200, res);
});
// creating a logout function
exports.logout = catchAsync(async (req, res, next) => {
  // in this we create a new cookie which replace the old cookie with no user data so its look like the user is log out
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
});

/// creating protect middle ware for the protected routes

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  /////// 1 get the token and checking it exist
  // we always send token in header name -- 'authorization' and the its value always start with -- 'Bearer' .. its just a common proceddure
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    // above code is because headers authorization looks like ..... authorization : 'Bearer jlsdfj;alkd' so splits it on the basis of spaces and the take the value at one position for the value of token
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  console.log("token :", token);
  if (!token) {
    return next(new AppError("invalid token... you are not logged in", 401));
  }
  //////  2 varification token

  // .verify send promise
  console.log(process.env.JWT_SECRET);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
  /////   3 check if user exist
  const freshUser = await User.findById(decoded.id);
  if (!freshUser)
    return next(new AppError("token belonging to the user doesnot exist", 401));
  // /////   4 if user change password after the token is issued
  // //// note:- currently this function is not working ........ isko future mai shi krna hai
  // if (await freshUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError("User currently changed password . please log in again", 401)
  //   );
  // }
  // grant access to the protected route
  req.user = freshUser;
  res.locals.user = freshUser;
  next();
});

/// using in a pug template to render the nav bar by checking that a person is login or not
exports.isLogin = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      /////   3 check if user exist
      const freshUser = await User.findById(decoded.id);
      if (!freshUser) return next();
      /////   4 if user change password after the token is issued
      //// note:- currently this function is not working ........ isko future mai shi krna hai
      if (await freshUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }
      // now the user is login
      res.locals.user = freshUser; // creating a local variabl that can be access by pug template
      return next();
    }
  } catch (err) {
    return next();
  }
  next();
  // note :- we donot use catchAsync block here because when we logout we send a random gibberish token which has nothing mean and when isLogin fuction verify it then it get an error and send error to the catchAsync error handler but in this case we dont need that error
};

/// creating restric middleware
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // console.log(req.user);

    if (!roles.includes(req.user.role))
      return next(new AppError("you dont have a permission do to this", 403));
    next();
  };
};

// exports.getMe = (req, res, next) => {
//   req.params.id = req.user._id;
//   next();
// };

exports.findUser = catchAsync(async(req, res, next) => {
  const { id } = req.params;
  if(!id) {
    return next( new AppError("Please provide id"), 401 );
  }
  const user = await User.findOne({_id: id});
  return res.status(200).json({
    success: true,
    user
  });
})

exports.getMe = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  console.log(req);

  const user = await User.findById(userId).select("-password -__v");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});