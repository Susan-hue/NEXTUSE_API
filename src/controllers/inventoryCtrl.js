const Inventory = require("../models/inventory");

exports.addWaste = async (req, res) => {
  const { wasteType, weight } = req.body;

  let inventory = await Inventory.findOne({ user: req.user.id });

  if (!inventory) {
    inventory = await Inventory.create({
      user: req.user.id,
      items: [],
    });
  }

  inventory.items.push({ wasteType, weight });
  inventory.totalWeight += weight;

  await inventory.save();

  res.json(inventory);
};

exports.getMyInventory = async (req, res) => {
  const inventory = await Inventory.findOne({ user: req.user.id });
  res.json(inventory);
};
