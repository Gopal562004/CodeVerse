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
      "https://code-verse-phi.vercel.app", // REMOVED TRAILING SLASH
      "https://code-verse-phi.vercel.app/", // Keep both for safety
    ];

    // More flexible matching for Vercel preview deployments
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith(".vercel.app") ||
      origin.includes("localhost")
    ) {
      callback(null, true);
    } else {
      console.log("CORS blocked for origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type", 
    "Authorization", 
    "X-Requested-With",
    "Accept",
    "Origin"
  ],
  exposedHeaders: ["Authorization"],
  maxAge: 86400, // 24 hours
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options("*", cors(corsOptions));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add specific CORS headers for all responses
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174", 
    "https://code-verse-phi.vercel.app"
  ];

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

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
    cors: "enabled",
    allowedOrigins: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://code-verse-phi.vercel.app"
    ]
  });
});

// Test CORS endpoint
app.get("/test-cors", (req, res) => {
  res.json({
    message: "CORS is working!",
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error.message === "Not allowed by CORS") {
    return res.status(403).json({
      message: "CORS policy: Origin not allowed",
      yourOrigin: req.headers.origin,
      allowedOrigins: [
        "http://localhost:5173",
        "http://localhost:5174", 
        "https://code-verse-phi.vercel.app"
      ]
    });
  }
  next(error);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.path,
    method: req.method
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌐 CORS enabled for:`);
  console.log(`   - http://localhost:5173`);
  console.log(`   - http://localhost:5174`);
  console.log(`   - https://code-verse-phi.vercel.app`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 CORS test: http://localhost:${PORT}/test-cors`);
});
