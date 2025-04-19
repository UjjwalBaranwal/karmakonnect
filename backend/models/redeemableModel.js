const { default: mongoose } = require("mongoose");

const redeemableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "redeem item name is required"],
  },
  point: {
    type: Number,
    required: [true, "redeem item must have points"],
  },
});

module.exports = mongoose.model("Redeemable", redeemableSchema);
