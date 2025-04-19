const { default: mongoose } = require("mongoose");

const eventModel = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please enter the title"],
    trim: true,
  },
  description: {
    type: String,
  },
  active: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    required: [true, "type is required"],
    enum: ["teaching", "plantation", "cleaning"],
  },
  ngo: {
    type: mongoose.Schema.ObjectId,
    ref: "NGO",
    required: [true, "ngo must belong to  event"],
  },
  eventDate: {
    type: Date,
    required: [true, "please provide event date"],
  },
});

module.exports = mongoose.model("Event", eventModel);
