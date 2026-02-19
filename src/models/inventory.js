const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  wasteType: String,
  weight: Number,
});

const inventorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    items: [itemSchema],
    totalWeight: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", inventorySchema);
