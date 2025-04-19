const { mongoose, model } = require("mongoose");

const donationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "user must belong to a donations"],
  },
  ngo: {
    type: mongoose.Schema.ObjectId,
    ref: "NGO",
    required: [true, "ngo must belong to a donations"],
  },
  donationType: {
    type: String,
    enum: ["wearable", "money", "books", "service"],
    required: [true, "pls enter the donation type"],
  },
  approve: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Donation", donationSchema);
