const express = require("express");
const { register, login } = require("../controllers/authCtrl");
const { protect } = require("../middleware/authZ");


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


router.get("/all-users", async (req, res) => {
  const users = await require("../models/user").find();
  res.json(users);
});


module.exports = router;
