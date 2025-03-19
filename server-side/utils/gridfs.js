const { GridFsStorage } = require("multer-gridfs-storage"); // Ensure correct import
const mongoose = require("mongoose");
const crypto = require("crypto");
const path = require("path");
const Grid = require("gridfs-stream");
const multer = require("multer");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/codeverse", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create storage engine
const storage = new GridFsStorage({
  url: "mongodb://localhost:27017/codeverse",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

module.exports = { upload, gfs };
