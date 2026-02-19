const mongoose = require("mongoose");

//Tracks how points were earned per pickup
const pointsLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    pickup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pickup",
    },
    pointsAwarded: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("PointsLog", pointsLogSchema);
