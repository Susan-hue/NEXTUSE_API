// const mongoose = require("mongoose");

// const pickupSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },

//     wasteType: String,
//     quantity: Number,
//     status: {
//       type: String,
//       enum: ["pending", "accepted", "completed"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Pickup", pickupSchema);




// const mongoose = require("mongoose");

// const pickupSchema = new mongoose.Schema(
//   {
//     household: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     agent: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },

//     wasteType: {
//       type: String,
//       required: true,
//     },

//     weight: {
//       type: Number,
//       required: true,
//     },

//     rewardAmount: {
//       type: Number,
//       default: 0,
//     },

//     status: {
//       type: String,
//       enum: ["pending", "assigned", "in_transit", "delivered", "completed"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Pickup", pickupSchema);





const mongoose = require("mongoose");

const pickupSchema = new mongoose.Schema(
  {
    household: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        wasteType: String,
        weight: Number,
      },
    ],
    totalWeight: Number,
    status: {
      type: String,
      enum: ["pending", "assigned", "in_transit", "delivered", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pickup", pickupSchema);



