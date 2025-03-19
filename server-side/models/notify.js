const mongoose = require("mongoose");

const notifySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ["like", "comment", "follow"], required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notify = mongoose.model("Notify", notifySchema);

module.exports = Notify;
