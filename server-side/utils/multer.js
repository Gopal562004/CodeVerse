const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.createConnection(
      process.env.MONGODB_URL_LOCAL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

const connPromise = connectDB();

const getStorage = async () => {
  const conn = await connPromise;
  return new GridFsStorage({
    db: conn.db,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => ({
      bucketName: "uploads",
      filename: `${Date.now()}-${file.originalname}`,
    }),
  });
};

const storage = async () => await getStorage();

const upload = multer({
  storage: await storage(),
});

module.exports = upload;
