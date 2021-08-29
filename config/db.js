const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`Mongo DB - ${connect.connection.host}`);
  } catch (err) {
    console.log(err.message);
    process.exit();
  }
};

module.exports = connectDB;
