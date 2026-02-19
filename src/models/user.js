// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     password: {
//       type: String,
//       required: true,
//       select: false,  //hide password by default
//     },

//     role: {
//       type: String,
//       enum: ["household", "agent", "admin"],
//       default: "household",
//     },

//     phone: {
//         type: String,
//     },

//     address:{
//         type: String,
//     },

//     walletBalance: {
//       type: Number,
//       default: 0,
//     },

//     rewardPoints: {
//       type:  Number,
//       default:0,
//     }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);





const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    role: {
      type: String,
      enum: ["household", "driver", "admin"],
      default: "household",
    },
    points: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
