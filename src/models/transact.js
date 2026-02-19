// const mongoose = require('mongoose');

// const transactionSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User', // assuming you have a User model
//       required: true,
//     },
//     amount: {
//       type: Number,
//       required: true,
//     },
//     type: {
//       type: String,
//       enum: ['reward', 'payment'],
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ['pending', 'completed', 'failed'],
//       default: 'pending',
//     },
//     description: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Transaction', transactionSchema);






// const mongoose = require("mongoose");

// const transactionSchema = new mongoose.Schema(
//   {
//     pickup: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Pickup",
//       required: true,
//     },

//     household: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     agent: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     amount: {
//       type: Number,
//       required: true,
//     },

//     type: {
//       type: String,
//       enum: ["reward", "payment"],
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Transaction", transactionSchema);













