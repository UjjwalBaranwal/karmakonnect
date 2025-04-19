const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Post = require('../models/postModel');

exports.createPost = catchAsync(async(req, res, next) => {
    const { typeOf, title, story, img, ngoId } = req.body;
    // console.log(typeOf + ' ' + title + ' ' + story + ' ' + image )
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
            img, 
            ngoId
        }).save();
    }
    res.status(201).json({
        success: true
    })
});

exports.getAll = catchAsync(async(req, res, next) => {
    const allPost = await Post.find();
    console.log(allPost);
    res.status(200).json({
        success: true,
        allPost
    });
});

exports.getPostById = catchAsync( async(req, res, next) => {
    const postId = req.params.id;
    console.log(postId);
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
    const ngoId = req.params.id;
    console.log(ngoId);
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

exports.getPostByType = catchAsync( (req, res, next) => {
    const type = req.params.typeOf;
    if(!type) {
        return next( new AppError("Can't") )
    }
})