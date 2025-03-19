const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure unique follow relationships (a user cannot follow the same user twice)
followSchema.index({ userId: 1, followerId: 1 }, { unique: true });

module.exports = mongoose.model("Follow", followSchema);
