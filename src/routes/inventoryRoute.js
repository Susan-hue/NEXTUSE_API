// //CREATE INVENTORY

// const express = require("express");
// const { protect, authorize } = require("../middleware/authZ");
// const Inventory = require("../models/inventory");

// const router = express.Router();

// //LOG WASTE INTO INVENTORY
// router.post(
//   "/add",
//   protect,
//   authorize("household"),
//   async (req, res) => {
//     const { wasteType, weight } = req.body;

//     let inventory = await Inventory.findOne({ user: req.user.id });

//     if (!inventory) {
//       inventory = await Inventory.create({
//         user: req.user.id,
//         items: [],
//       });
//     }

//     inventory.items.push({ wasteType, weight });
//     inventory.totalWeight += weight;

//     await inventory.save();

//     res.status(200).json(inventory);
//   }
// );


// //VIEW INVENTORY
// router.get(
//   "/me",
//   protect,
//   authorize("household"),
//   async (req, res) => {
//     const inventory = await Inventory.findOne({ user: req.user.id });

//     res.json(inventory);
//   }
// );


// module.exports = router;





const express = require("express");
const { protect, authorize } = require("../middleware/authZ");
const { addWaste, getMyInventory } = require("../controllers/inventoryCtrl");

const router = express.Router();

router.post("/add", protect, authorize("household"), addWaste);
router.get("/me", protect, authorize("household"), getMyInventory);

module.exports = router;



