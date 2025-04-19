const redeemableModel = require("../models/redeemableModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { approveDonation } = require("./donationController");

// Create a new redeemable item
exports.createRedeemableItem = catchAsync(async (req, res, next) => {
  const newRedeemableItem = await redeemableModel.create({
    name: req.body.name,
    point: req.body.point,
  });

  if (!newRedeemableItem)
    return next(new AppError("Error in creating new redeemable item"));

  res.status(200).json({
    status: "success",
    data: { newRedeemableItem },
  });
});

// Get redeemable item by ID
exports.getRedeemableById = catchAsync(async (req, res, next) => {
  const redeemable = await redeemableModel.findById(req.params.id);

  if (!redeemable) return next(new AppError("Redeemable item not found", 404));

  res.status(200).json({
    status: "success",
    data: { redeemable },
  });
});

// Update redeemable item by ID
exports.updateRedeemableById = catchAsync(async (req, res, next) => {
  const updatedItem = await redeemableModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      point: req.body.point,
    },
    { new: true, runValidators: true }
  );

  if (!updatedItem)
    return next(new AppError("Failed to update redeemable item", 404));

  res.status(200).json({
    status: "success",
    data: { updatedItem },
  });
});

// Get all redeemable items
exports.getAllRedeemables = catchAsync(async (req, res, next) => {
  const redeemables = await redeemableModel.find();

  res.status(200).json({
    status: "success",
    results: redeemables.length,
    data: { redeemables },
  });
});

//Delete redeemable by id

exports.deleteById = catchAsync(async (req, res, next) => {
  const redeemable = await redeemableModel.findByIdAndDelete(req.params.id);
  if (!redeemable)
    return next(new AppError("cant find redeemable item by given id"));
  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Redeem item by id

exports.redeemById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const redeemableItem = await redeemableModel.findById(id);
  if (!redeemableItem)
    return next(new AppError("This item does not exist", 400));

  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) return next(new AppError("User does not exist", 400));

  if (redeemableItem.point > user.punya)
    return next(
      new AppError(
        "Cannot redeem this item, your punya points are too low",
        400
      )
    );

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $inc: { punya: -redeemableItem.point } },
    { new: true, runValidators: false }
  );

  res.status(200).json({
    status: "success",
    message: "Item redeemed successfully",
    data: {
      redeemedItem: {
        id: redeemableItem._id,
        name: redeemableItem.name,
        point: redeemableItem.point,
      },
      remainingPunya: updatedUser.punya,
    },
  });
});
