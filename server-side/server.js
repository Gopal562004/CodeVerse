// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Import routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

// Import and initialize database connection
require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes

app.use("/user", userRoutes);
app.use("/posts", postRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Start Server
const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
