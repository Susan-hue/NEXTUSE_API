const express = require("express");
const { protect, authorize } = require("../middleware/authZ");
const { redeemPoints, getWalletBalance } = require("../controllers/redeemCtrl");

const router = express.Router();

router.post("/", protect, authorize("household"), redeemPoints);
router.get("/wallet", protect, authorize("household"), getWalletBalance);

module.exports = router;