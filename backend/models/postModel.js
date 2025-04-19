const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    typeOf: {
        type: String,
        enum: ["donation", "volunteer", "announcement"],
        required: true
    }, 
    title: {
        type: String,
        required: true
    }, 
    story: {
        type: String,
        required: true
    }, 
    ngoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ngo",
        required: true
    }, 
    image: {
        type: String
    }  
});

module.exports = new mongoose.model("Post", postSchema);