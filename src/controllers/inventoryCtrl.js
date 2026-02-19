const Inventory = require("../models/inventory");

// ADD WASTE TO INVENTORY
exports.addWaste = async (req, res) => {
  try {
    const { wasteType, weight } = req.body;

    let inventory = await Inventory.findOne({ user: req.user.id });

    if (!inventory) {
      inventory = await Inventory.create({
        user: req.user.id,
        items: [],
        totalWeight: 0,
      });
    }

    inventory.items.push({ wasteType, weight });
    inventory.totalWeight += weight;

    await inventory.save();

    res.status(200).json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET MY INVENTORY
exports.getMyInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({ user: req.user.id });

    if (!inventory)
      return res.status(404).json({ message: "No inventory found" });

    res.status(200).json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};