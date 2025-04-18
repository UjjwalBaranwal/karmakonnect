const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllUser = catchAsync(async(req, res, next) => {
    const entries = await User.find()
      .sort({ maximumPunya: -1 });

    res.status(200).json({
        success: true,
        data: entries
    });
});

exports.getUserById = catchAsync(async (req, res, next) => {
    const entries = await User.find()
      .sort({ maximumPunya: -1 });

    let indexOfReturn = -1;
    for(let i = 0; i < entries.length; i++) {
        if(entries[i]._id == req.params.id) {
            indexOfReturn = i+1;
            console.log(i+1);
            break;
        } 
    }

    if(indexOfReturn == -1) {
        return next( new AppError("No user with given id exists"), 400 );
    }

    return res.status(200).json({
        success: true,
        rank: indexOfReturn,
        users: entries[indexOfReturn - 1]
    });
});