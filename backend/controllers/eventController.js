const { default: mongoose } = require("mongoose");
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

exports.fillSideBar = catchAsync(async (req, res, next) => {
  const eventId = req.params.id;

  // Validate eventId
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return next(new AppError("Invalid event ID", 400));
  }

  const event = await eventModel.findById(eventId);
  if (!event) {
    return next(new AppError("Event not found", 404));
  }

  // Check if there are any volunteers for this event
  const volunteerCount = await eventVolunteer.countDocuments({
    event: eventId,
  });
  if (volunteerCount === 0) {
    return res.status(200).json({
      success: true,
      noOfVolunteers: 0,
      event,
      genderLookup: [],
      ageGroups: [],
    });
  }

  // Gender aggregation
  const genderLookup = await eventVolunteer.aggregate([
    {
      $match: {
        event: new mongoose.Types.ObjectId(eventId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "volunteer",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $group: {
        _id: "$user.gender",
        count: { $sum: 1 },
      },
    },
  ]);

  // Age group aggregation
  const ageGroups = await eventVolunteer.aggregate([
    {
      $match: {
        event: new mongoose.Types.ObjectId(eventId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "volunteer",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $addFields: {
        age: { $ifNull: ["$user.age", 0] }, // Handle missing ages
      },
    },
    {
      $bucket: {
        groupBy: "$age",
        boundaries: [18, 25, 35, 45, Infinity],
        default: "Unknown",
        output: {
          count: { $sum: 1 },
        },
      },
    },
    {
      $project: {
        _id: 0,
        range: {
          $switch: {
            branches: [
              { case: { $eq: ["$_id", 18] }, then: "18-24" },
              { case: { $eq: ["$_id", 25] }, then: "25-34" },
              { case: { $eq: ["$_id", 35] }, then: "35-44" },
              { case: { $eq: ["$_id", 45] }, then: "45+" },
              { case: { $eq: ["$_id", "Unknown"] }, then: "Unknown" },
            ],
            default: "Unknown",
          },
        },
        count: 1,
      },
    },
    {
      $group: {
        _id: "$range",
        count: { $sum: "$count" },
      },
    },
  ]);

  res.status(200).json({
    success: true,
    noOfVolunteers: volunteerCount,
    event,
    genderLookup,
    ageGroups,
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

exports.getAll = catchAsync(async (req, res, next) => {
  const allEvent = await eventModel.find();
  res.status(200).json({
    allEvent,
  });
});

exports.findAllVolunteer = catchAsync(async (req, res, next) => {
  const allVolunteers = await eventVolunteer
    .find({ event: req.params.eventId })
    .populate("volunteer", "name");
  res.status(200).json({
    allVolunteers,
  });
});
