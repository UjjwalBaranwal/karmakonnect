const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.test = catchAsync(async (req, res, next) => {
  // how to handle Error scence

  res.status(200).json({ status: "success", data: null });
});

// hey guys this is test controller here i will show you how to create a controller in much faster way

/*
suppose you have a model name User
and you want to check that user lie in the database or not 
so this is the way you do it


exports.findUser=catchAsync(async(req,res,next)=>{
        const {id}=req.body;
        const user=await User.findById(id);
        if(!user){
            return next(AppError('no user found',400))
        }
        res.status(200).json({status:'success',data:user})

    })

result :
    1) we dont have to fall in a trap of async/await
    2) we dont have to write the manually every time Error
*/
