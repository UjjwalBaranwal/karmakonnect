const User = require("../models/userModel");
const Ngo = require("../models/ngoModel");
const Donation = require("../models/donationModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createDonation = catchAsync(async (req, res, next) => {
  const { userId, ngoId, donation } = req.body;
  const user = await User.findById(userId);
  if (!user) return next(new AppError("user not exist", 400));
  const ngo = await Ngo.findById(ngoId);
  if (!ngo) return next(new AppError("ngo is not exits", 400));
  const newDonation = await Donation.create({
    user: userId,
    ngo: ngoId,
    donationType: donation,
  });
  if (!newDonation)
    return next(new AppError("Problem in creating new donations", 400));
  res.status(200).json({ status: "success", data: { newDonation } });
});

exports.getDonationById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const donation = await Donation.findById(id);
  if (!donation) return next(new AppError("this donations is not exist"));
  res.status(200).json({ status: "success", data: { donation } });
});

exports.getDonationByUserId = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const donation = await Donation.find({ user: userId });
  if (!donation) return next(new AppError("this donations is not exist"));
  res.status(200).json({ status: "success", data: { donation } });
});

exports.getDonationByNgoId = catchAsync(async (req, res, next) => {
  const ngoId = req.params.ngoId;
  const donation = await Donation.find({ ngo: ngoId });
  if (!donation) return next(new AppError("this donations is not exist"));
  res.status(200).json({ status: "success", data: { donation } });
});

exports.approveDonation = catchAsync(async (req, res, next) => {
  const donationId = req.params.id;
  const donation = await Donation.findById(donationId);
  if (!donation) return next(new AppError("this donation is not exist"));
  if (donation.approve) {
    return next(new AppError("Donation is already approved", 400));
  }
  const ngo = await Ngo.findById(donation.ngo);
  if (!ngo) return next(new AppError("ngo is not exits", 400));

  const user = await User.findById(donation.user);
  if (!user) return next(new AppError("user not exist", 400));

  await User.findByIdAndUpdate(user._id, {
    $inc: { punya: 100, maximumPunya: 100 },
  });
  donation.approve = true;
  await donation.save();
  res.status(200).json({ status: "success", message: "donation is approved" });
});
