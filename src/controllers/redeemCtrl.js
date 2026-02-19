const User = require("../models/user");

const MINIMUM_POINTS = 100;
const POINTS_TO_NAIRA = 5;

// REDEEM POINTS TO WALLET
exports.redeemPoints = async (req, res) => {
  try {
    const { points } = req.body;

    if (!points || points < MINIMUM_POINTS)
      return res.status(400).json({
        message: `Minimum ${MINIMUM_POINTS} points required to redeem`,
      });

    const user = await User.findById(req.user.id);

    if (user.points < points)
      return res.status(400).json({ message: "Insufficient points" });

    const value = points * POINTS_TO_NAIRA;

    user.points -= points;
    user.wallet += value;
    await user.save();

    res.status(200).json({
      message: "Points redeemed successfully",
      pointsRedeemed: points,
      valueAdded: `₦${value}`,
      remainingPoints: user.points,
      walletBalance: user.wallet,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET MY WALLET BALANCE
exports.getWalletBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      points: user.points,
      walletBalance: user.wallet,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};