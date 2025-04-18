const AppError = require("./../utils/appError");

const handleCastErrorDB = (err) => {
  const msg = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(msg, 400);
};

const handleDuplicateNameErrorDB = (err) => {
  const key = Object.keys(err.keyValue).join(", ");
  const msg = `Duplicate field: '${key}' with value '${err.keyValue[key]}'`;
  return new AppError(msg, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const msg = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(msg, 400);
};

const handleErrorJWT = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleTokenExpireError = () =>
  new AppError("Your token has expired. Please log in again!", 401);

const sendErrorDev = (req, res, err) => {
  // For API
  if (req.originalUrl && req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // For non-API (frontend) — fallback to JSON instead of render
  return res.status(err.statusCode).json({
    title: "Something went wrong!",
    msg: err.message,
  });
};

const sendErrorProd = (req, res, err) => {
  if (req.originalUrl && req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    console.error("ERROR 💣", err);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }

  // For non-API (frontend) — fallback to JSON
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      title: "Something went wrong!",
      msg: err.message,
    });
  }

  console.error("ERROR 💣", err);
  return res.status(500).json({
    title: "Something went wrong!",
    msg: "Please try again later.",
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(req, res, err);
  } else {
    let error = { ...err };
    error.message = err.message;

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateNameErrorDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleErrorJWT();
    if (error.name === "TokenExpiredError") error = handleTokenExpireError();

    sendErrorProd(req, res, error);
  }
};
