// db.js
const mongoose = require("mongoose");
require("dotenv").config();

// Define MongoDB connection URL
const mongoURL = process.env.MONGODB_URL_LOCAL;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Event listeners for MongoDB connection
db.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});
db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});
db.on("connected", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
