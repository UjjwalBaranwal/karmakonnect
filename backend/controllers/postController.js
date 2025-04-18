const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Post = require('../models/postModel');

exports.createPost = catchAsync(async(req, res, next) => {
    const { typeOf, title, story, image, ngoId } = req.body;
    if(!img) {
        await new Post({
            typeOf,
            title,
            story,
            ngoId
        }).save();
    } else {
        await new Post({
            typeOf,
            title,
            story,
            image, 
            ngoId
        }).save();
    }
});

exports.getAll = catchAsync(async(req, res, next) => {
    const allPost = await Post.find();
    res.status(200).json({
        sucess: true,
        allPost
    });
});

exports.getPostById = catchAsync( async(req, res, next) => {
    const postId = req.params.id;
    if(!postId) {
        return next( new AppError("No id given!!!"), 400);
    }

    const idPost = await Post.findOne({ _id: postId });
    if(!idPost) {
        return next( new AppError("Cannot find the post with given id!!!"), 400 );
    }
    return res.status(200).json({
        sucess: true,
        idPost
    });
});

exports.getPostByNgoId = catchAsync( async(req, res, next) => {
    const ngoId = req.params.ngoId;
    if(!ngoId) {
        return next( new AppError("No Ngo with given id exists!!"), 400 );
    }

    const allNgoPost = await Post.find({ 
        ngoId
    });
    return res.status(200).json({
        success: true,
        allNgoPost
    });
});

