const express = require("express");
const { register, login } = require("../controllers/authCtrl");
const { protect, authorize } = require("../middleware/authZ");


const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, (req, res) => {
  res.json({
    message: "Protected route working",
    user: req.user,
  });
});

// router.post("/register", (req, res) => {
//   console.log("Route reached");
//   res.json({ message: "Route working" });
// });


router.get("/test", (req, res) => {
  res.json({ message: "Auth route working" });
});


// FIXED - admin only, password excluded
router.get("/all-users", protect, authorize("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }

});


module.exports = router;
