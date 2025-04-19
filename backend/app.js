const morgan = require("morgan");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

// Routes
const testRouter = require("./routes/testRoutes");
const userRouter = require("./routes/userRoutes");
const ngoRouter = require("./routes/ngoRoutes");
const postRouter = require("./routes/postRoutes");
const leaderboardRouter = require("./routes/leaderboardRoutes");
const volunteerRouter = require("./routes/volunteerRoutes");
const donationRouter = require("./routes/donationRoutes");
const redeemableRouter = require("./routes/redeemableRoute");
const eventRouter = require("./routes/eventRoute");
// Controller (only needed)
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
//limmiter middleware
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, //allow 100 request in 1hour
  message: "too many request this ip now please try again in a hour",
});
app.use("/api", limiter);
// body parser , reading data from body into req.body

app.use(express.json({ limit: "10kb" })); //middleWare
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
); //for parsing the data that come with url post request

//////////////////////////////////////////////////////////////////////
/////////// Creating our own middleWare function
app.use((req, res, next) => {
  console.log("hello from the middleware 😎");
  console.log(req.cookies);
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});
////////////////////////////////////////////////////////////////////////
////// all API ENDPOINTS
// for testing
app.use("/api/v1/test/", testRouter);
//for user
app.use("/api/v1/user", userRouter);
app.use("/api/v1/ngo", ngoRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/leaderboard", leaderboardRouter);
app.use("/api/v1/volunteer", volunteerRouter);
app.use("/api/v1/donation", donationRouter);
app.use("/api/v1/redeemable", redeemableRouter);
app.use("/api/v1/event", eventRouter);
app.all(/(.*)/, (req, res, next) => {
  next(new AppError(`can't find the ${req.originalUrl}`, 404));
});
//// Implementing the global error handling middleware

app.use(globalErrorHandler);

module.exports = app;
