const { default: mongoose, mongo } = require("mongoose");

const eventVolunteer = new mongoose.Schema({
  volunteer: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "volunteer is required"],
  },
  event: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",

    required: [true, "event must requried"],
  },
});

module.exports = mongoose.model("EventVolunteer", eventVolunteer);
