const eventModel = require("../models/eventModel");
const eventVolunteer = require("../models/eventVolunteer");
const ngoModel = require("../models/ngoModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createEvent = catchAsync(async (req, res, next) => {
  const ngoId = req.ngo._id;
  const ngo = await ngoModel.findById(ngoId);
  if (!ngo) return next(new AppError("NGO is not found"));
  const newEvent = await eventModel.create({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    eventDate: req.body.eventDate,
    ngo: req.ngo._id,
  });
  if (!newEvent) return next(new AppError("Problem in creating the new event"));
  res.status(200).json({
    status: "success",
    data: newEvent,
  });
});

exports.addVolunteerInEvent = catchAsync(async (req, res, next) => {
  const eventId = req.params.id;
  const userId = req.user._id;
  const event = await eventModel.findById(eventId);
  if (!event) return next(new AppError("event not found"));
  const user = await User.findById(userId);
  if (!user) return next(new AppError("user is not found"));
  const eventVolunteerMapping = await eventVolunteer.create({
    volunteer: userId,
    event: eventId,
  });
  if (!eventVolunteerMapping)
    return next(new AppError("problem in adding volunteer in event"));
  res.status(200).json({ status: "success", data: eventVolunteerMapping });
});

exports.getEventByNGOId = catchAsync(async (req, res, next) => {
  const ngoId = req.params.id;
  const event = await eventModel.find({ ngo: ngoId });
  if (!event) return next(new AppError("Event is not found"));
  res.status(200).json({ status: "success", data: event });
});

exports.getEventById = catchAsync(async (req, res, next) => {
  const ngoId = req.params.id;
  const event = await eventModel.findById(ngoId);
  if (!event) return next(new AppError("Event is not found"));
  res.status(200).json({ status: "success", data: event });
});
