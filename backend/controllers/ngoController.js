const { promisify } = require("util");
const Ngo = require("./../models/ngoModel");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const crypto = require("crypto");
const { env } = require("process");

// Helper: sign a JWT for a given NGO id
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// Helper: send token as cookie + JSON
const createAndSendToken = (ngo, statusCode, res) => {
  const token = signToken(ngo._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  // Remove password from output
  ngo.password = undefined;

  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    token,
    data: { ngo },
  });
};

// ─────────────────────────────────────────────────────────────
// SIGN UP: create a new NGO
exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword, location, yojnas } = req.body;

  // Create the NGO document; will trigger your pre-save password hash
  const newNgo = await Ngo.create({
    name,
    email,
    password,
    confirmPassword,
    location, // { type: 'Point', coordinates: [lng, lat], address, city, ... }
    yojnas, // array of your enum strings
  });

  createAndSendToken(newNgo, 201, res);
});

// ─────────────────────────────────────────────────────────────
// LOGIN: authenticate an NGO by name + password
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check both fields
  if (!email || !password) {
    return next(new AppError("Please provide name and password", 400));
  }

  // 2) Fetch NGO + password
  const ngo = await Ngo.findOne({ email }).select("+password");
  if (!ngo || !(await ngo.correctPassword(password, ngo.password))) {
    return next(new AppError("Name or password is incorrect", 401));
  }

  // 3) Send token
  createAndSendToken(ngo, 200, res);
});

// ─────────────────────────────────────────────────────────────
// LOGOUT: overwrite cookie to “log out”
exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
});

// ─────────────────────────────────────────────────────────────
// PROTECT: middleware for protected routes
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // 1) Get token from header or cookie
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError("You are not logged in", 401));
  }

  // 2) Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check NGO still exists
  const freshNgo = await Ngo.findById(decoded.id);
  if (!freshNgo) {
    return next(new AppError("NGO no longer exists", 401));
  }

  // 4) Grant access
  req.ngo = freshNgo;
  res.locals.ngo = freshNgo;
  next();
});

// ─────────────────────────────────────────────────────────────
// isLogin: for templates (e.g. Pug) to know if an NGO is logged in
exports.isLogin = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      /////   3 check if user exist
      const freshNgo = await Ngo.findById(decoded.id);
      if (!freshNgo) return next();
      /////   4 if user change password after the token is issued
      //// note:- currently this function is not working ........ isko future mai shi krna hai
      if (await freshNgo.changedPasswordAfter(decoded.iat)) {
        return next();
      }
      // now the user is login
      res.locals.user = freshNgo; // creating a local variabl that can be access by pug template
      return next();
    }

    /////   4 if user change password after the token is issued
    //// note:- currently this function is not working ........ isko future mai shi krna hai
  } catch (err) {
    return next();
  }
  next();
};

// ─────────────────────────────────────────────────────────────
// getMe: set req.params.id for “/me” route so you can reuse getNgo
exports.getMe = (req, res, next) => {
  req.params.id = req.ngo.id;
  next();
};

// ─────────────────────────────────────────────────────────────
// getNgo: fetch a single NGO by ID
exports.getNgo = catchAsync(async (req, res, next) => {
  const ngo = await Ngo.findById(req.params.id);
  if (!ngo) {
    return next(new AppError("No NGO found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: { ngo },
  });
});

exports.getAllNgos = async (req, res) => {
  try {
    const ngos = await Ngo.find().select("+location"); // location is not hidden, but ensure it’s included
    res.status(200).json({
      status: "success",
      results: ngos.length,
      data: ngos,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message || "Failed to fetch NGOs",
    });
  }
};
