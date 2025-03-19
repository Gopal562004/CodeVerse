// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Import routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const likeRoutes = require("./routes/likeRoutes");
const profileRoutes = require("./routes/profileRoutes");
const savedPostRoutes = require("./routes/savedPostRoutes");
const commentRoutes = require("./routes/commentRoutes");
const followRoutes = require("./routes/followRoutes")
const notifyRoutes = require("./routes/notifyRoutes")
// Import and initialize database connection
require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/", likeRoutes);
app.use("/user", userRoutes);
app.use("/posts", postRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/profile", profileRoutes);
app.use("/", savedPostRoutes);
app.use("/", commentRoutes);
app.use("/", followRoutes);
app.use("/notifications", notifyRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const path = require("path");
// const http = require("http");
// const { Server } = require("socket.io");
// require("dotenv").config();

// // Import database connection
// require("./config/db");

// // Import routes
// const userRoutes = require("./routes/userRoutes");
// const postRoutes = require("./routes/postRoutes");
// const likeRoutes = require("./routes/likeRoutes");
// const profileRoutes = require("./routes/profileRoutes");
// const savedPostRoutes = require("./routes/savedPostRoutes");
// const commentRoutes = require("./routes/commentRoutes");
// const followRoutes = require("./routes/followRoutes");
// const notifyRoutes = require("./routes/notifyRoutes");

// // Import socket handler
// const socketHandler = require("./routes/notifySocket");

// const app = express();
// const server = http.createServer(app);

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Routes
// app.use("/user", userRoutes);
// app.use("/posts", postRoutes);
// app.use("/", likeRoutes);
// app.use("/", savedPostRoutes);
// app.use("/", commentRoutes);
// app.use("/", followRoutes);
// app.use("/profile", profileRoutes);
// app.use("/notifications", notifyRoutes);

// // Initialize Socket.io
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5174", // Allow all origins (Change this in production)
//     methods: ["GET", "POST"],
//   },
// });
// socketHandler(io);

// // Start Server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });
