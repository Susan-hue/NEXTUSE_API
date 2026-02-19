
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// app.get('/', (req, res) => { 
//     res.send("NextUse API is running")
// });

// app.use((req, res, next) => {
//   console.log("Incoming request:", req.method, req.url);
//   next();
// });

const authRoute = require("./src/routes/authRoute")
app.use("/api/auth", authRoute);


const pickupRoutes = require("./src/routes/pickupRoute");
app.use("/api/pickups", pickupRoutes);


const inventoryRoutes = require("./src/routes/inventoryRoute");
app.use("/api/inventory", inventoryRoutes);

const { protect, authorize } = require("./src/middleware/authZ");
module.exports = app;
