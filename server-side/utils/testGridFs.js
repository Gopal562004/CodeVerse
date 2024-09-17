const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
require("dotenv").config();

const conn = mongoose.createConnection(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

conn.once("open", () => {
  const gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");

  const writestream = gfs.createWriteStream({
    filename: "testFile.txt",
    content_type: "text/plain",
  });

  writestream.write("This is a test file");
  writestream.end();

  writestream.on("close", (file) => {
    console.log("Test file uploaded with ID:", file._id);
    conn.close();
  });

  writestream.on("error", (err) => {
    console.error("Error uploading test file:", err);
    conn.close();
  });
});
