const User = require('../models/userModel');
const Post = require('../models/postModel');
const Ngo = require('../models/ngoModel');
const Volunteer = require('../models/volunteerModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllVolunteerByNgoId = catchAsync(async (req, res, next) => {
    const NgoId = req.params.id;
    if(!NgoId) {
        return next( AppError("No ngo id passed :("), 400 );
    }
    const allVolunteer = await Volunteer.find({ngoId: NgoId});
    res.status(200).json({
        success: true,
        data: allVolunteer
    });
});

exports.getVolunteerByPostId = catchAsync(async(req, res, next) => {
    const postId = req.params.id;
    if(!postId) {
        return next(new AppError("No Post id found :("), 400 );
    }

    const allVolunteer = await Volunteer.find({postId: postId});
    res.status(201).json({
        success: true,
        data: allVolunteer
    });
});

exports.createVolunteer = catchAsync(async(req, res,  next) => {
    const { ngoId, postId, userId } = req.params;
    await new Volunteer({
        ngoId,
        postId, 
        userId
    }).save();
    res.status(200).json({
        success: true
    });
});

exports.getAllVolunteer = catchAsync(async(req, res, next) => {
    const allVolunteer = await Volunteer.find();
    res.status(200).json({
        success: true,
        data: allVolunteer
    });
});