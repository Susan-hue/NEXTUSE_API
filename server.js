require ('dotenv').config()
const connectDB = require('./src/config/db');
const app = require('./app');


connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});

// app.listen(8000, () => {
//   console.log("Server running on port 8000");
// });


// console.log("MONGO_URI RAW:", JSON.stringify(process.env.MONGO_URI));

// // console.log("MONGO_URI:", process.env.MONGO_URI);








// const dotenv = require('dotenv');

// dotenv.config();

// const express = require('express');
// const connectDB = require('./src/config/db')
// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(express.json());
// app.use(require('cors')());

// // Routes placeholder
// app.get('/', (req, res) => {
//   res.send('Server running...');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





// const authRoutes = require("./src/routes/regs_logs");

// app.use("/api/auth", regs_logs);
