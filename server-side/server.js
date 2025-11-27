// // server.js
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const path = require("path");
// require("dotenv").config();

// // Import routes
// const userRoutes = require("./routes/userRoutes");
// const postRoutes = require("./routes/postRoutes");
// const likeRoutes = require("./routes/likeRoutes");
// const profileRoutes = require("./routes/profileRoutes");
// const savedPostRoutes = require("./routes/savedPostRoutes");
// const commentRoutes = require("./routes/commentRoutes");
// const followRoutes = require("./routes/followRoutes")
// const notifyRoutes = require("./routes/notifyRoutes")
// // Import and initialize database connection
// require("./config/db");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Routes
// app.use("/", likeRoutes);
// app.use("/user", userRoutes);
// app.use("/posts", postRoutes);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/profile", profileRoutes);
// app.use("/", savedPostRoutes);
// app.use("/", commentRoutes);
// app.use("/", followRoutes);
// app.use("/notifications", notifyRoutes);

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// // const express = require("express");
// // const bodyParser = require("body-parser");
// // const cors = require("cors");
// // const path = require("path");
// // const http = require("http");
// // const { Server } = require("socket.io");
// // require("dotenv").config();

// // // Import database connection
// // require("./config/db");

// // // Import routes
// // const userRoutes = require("./routes/userRoutes");
// // const postRoutes = require("./routes/postRoutes");
// // const likeRoutes = require("./routes/likeRoutes");
// // const profileRoutes = require("./routes/profileRoutes");
// // const savedPostRoutes = require("./routes/savedPostRoutes");
// // const commentRoutes = require("./routes/commentRoutes");
// // const followRoutes = require("./routes/followRoutes");
// // const notifyRoutes = require("./routes/notifyRoutes");

// // // Import socket handler
// // const socketHandler = require("./routes/notifySocket");

// // const app = express();
// // const server = http.createServer(app);

// // // Middleware
// // app.use(cors());
// // app.use(bodyParser.json());
// // app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // // Routes
// // app.use("/user", userRoutes);
// // app.use("/posts", postRoutes);
// // app.use("/", likeRoutes);
// // app.use("/", savedPostRoutes);
// // app.use("/", commentRoutes);
// // app.use("/", followRoutes);
// // app.use("/profile", profileRoutes);
// // app.use("/notifications", notifyRoutes);

// // // Initialize Socket.io
// // const io = new Server(server, {
// //   cors: {
// //     origin: "http://localhost:5174", // Allow all origins (Change this in production)
// //     methods: ["GET", "POST"],
// //   },
// // });
// // socketHandler(io);

// // // Start Server
// // const PORT = process.env.PORT || 5000;
// // server.listen(PORT, "0.0.0.0", () => {
// //   console.log(`🚀 Server is running on port ${PORT}`);
// // });


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
const followRoutes = require("./routes/followRoutes");
const notifyRoutes = require("./routes/notifyRoutes");

// Import and initialize database connection
require("./config/db");

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://your-production-domain.com", // Add your production domain
    ];

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // This is crucial for cookies/sessions
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error.message === "Not allowed by CORS") {
    return res.status(403).json({
      message: "CORS policy: Origin not allowed",
    });
  }
  next(error);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(
    `🌐 CORS enabled for: http://localhost:5173, http://localhost:5174`
  );
});