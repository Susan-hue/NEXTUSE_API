// const Pickup = require("../models/pickup");
// const Inventory = require("../models/inventory");
// const User = require("../models/user");
// const PointsLog = require("../models/pointsLog");


// //HOUSEHOLD REQUESTS PICKUP
// exports.createPickup = async (req, res) => {
//   try {
//     if (req.user.role !== "household") {
//       return res.status(403).json({ message: "Only households can create pickup" });
//     }

//     const { wasteType, weight } = req.body;

//     const pickup = await Pickup.create({
//       household: req.user.id,
//       wasteType,
//       weight,
//     });

//     res.status(201).json(pickup);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };



// ///ADMIN ASSIGNS AGENT TO PICKUP WASTE
// exports.assignAgent = async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Only admin can assign agent" });
//     }

//     const { agentId } = req.body;

//     const pickup = await Pickup.findById(req.params.id);
//     if (!pickup) return res.status(404).json({ message: "Pickup not found" });

//     pickup.agent = agentId;
//     pickup.status = "assigned";

//     await pickup.save();

//     res.json({ message: "Agent assigned", pickup });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


// //DRIVER REPORTS COLLECTION OF WASTE
// exports.markCollected = async (req, res) => {
//   try {
//     if (req.user.role !== "agent") {
//       return res.status(403).json({ message: "Only agent can mark collected" });
//     }

//     const pickup = await Pickup.findById(req.params.id);
//     if (!pickup) return res.status(404).json({ message: "Pickup not found" });

//     pickup.status = "collected";

//     await pickup.save();

//     res.json({ message: "Pickup marked as collected", pickup });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };




// //ADMIN APPROVES PICKUP IS DONE SO PAYMENT CAN BE MADE
// exports.approvePickup = async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ message: "Only admin can approve pickup" });
//     }

//     const pickup = await Pickup.findById(req.params.id);
//     if (!pickup) return res.status(404).json({ message: "Pickup not found" });

//     if (pickup.status !== "collected") {
//       return res.status(400).json({ message: "Pickup must be collected before delivery" });
//     }

//     const rewardAmount = pickup.weight * 50;
//     const rewardPoints = pickup.weight * 10;

//     const user = await User.findById(pickup.household);

//     user.walletBalance += rewardAmount;
//     user.rewardPoints += rewardPoints;

//     await user.save();

//     pickup.rewardAmount = rewardAmount;
//     pickup.status = "delivered";

//     await pickup.save();

//     await Transaction.create({
//       user: user._id,
//       amount: rewardAmount,
//       relatedPickup: pickup._id,
//     });

//     res.json({
//       message: "Pickup delivered and reward credited",
//       rewardAmount,
//       rewardPoints,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };







//NEW ARCHITECTURE 
const Pickup = require("../models/pickup");
const Inventory = require("../models/inventory");
const User = require("../models/user");
const PointsLog = require("../models/pointsLog");



//CREATE PICKUP
exports.createPickup = async (req, res) => {
  const inventory = await Inventory.findOne({ user: req.user.id });

  if (!inventory || inventory.totalWeight < 5) {
    return res.status(400).json({
      message: "Minimum 5kg required to request pickup",
    });
  }

  const pickup = await Pickup.create({
    household: req.user.id,
    items: inventory.items,
    totalWeight: inventory.totalWeight,
  });

  // Reset inventory
  inventory.items = [];
  inventory.totalWeight = 0;
  await inventory.save();

  res.status(201).json(pickup);
};



//ASSIGN DRIVER
exports.assignDriver = async (req, res) => {
  try {
    const { driverId } = req.body;

    const pickup = await Pickup.findById(req.params.id);
    if (!pickup)
      return res.status(404).json({ message: "Pickup not found" });

    pickup.driver = driverId;
    pickup.status = "assigned";

    await pickup.save();

    res.json(pickup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



//DRIVER MARKS DELIVERED
exports.markDelivered = async (req, res) => {
  const pickup = await Pickup.findById(req.params.id);

  pickup.status = "delivered";

  await pickup.save();

  res.json(pickup);
};



//ADMIN APPROVES AND AWARDS POINT
exports.approvePickup = async (req, res) => {
  const pickup = await Pickup.findById(req.params.id);

  if (pickup.status !== "delivered") {
    return res.status(400).json({
      message: "Pickup not delivered yet",
    });
  }

  const points = pickup.totalWeight * 10;

  const user = await User.findById(pickup.household);
  user.points += points;
  await user.save();

  await PointsLog.create({
    user: user._id,
    pickup: pickup._id,
    pointsAwarded: points,
  });

  pickup.status = "completed";
  await pickup.save();

  res.json({
    message: "Pickup completed and points awarded",
    pointsAwarded: points,
  });
};




