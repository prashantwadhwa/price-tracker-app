const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Something went wrong while connecting to DB");
    process.exit(1);
  }
}

module.exports = connectDB;
