// const mongoose = require('mongoose');

// const connectDB = async()=>{
//     try{
//         await mongoose.connect('process.env.MONGO_URI')
//         console.log("MongoDB connected successfully")
//     } catch (error) {
//         console.error(error)
//         process.exit(1)
//     }
// };

// module.exports = connectDB;







// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config();

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error('MongoDB connection error:', error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;













const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    // Just pass the URI directly — no options needed
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
