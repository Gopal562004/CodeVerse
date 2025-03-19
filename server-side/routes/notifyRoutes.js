const express = require("express");
const Notify = require("../models/notify"); // Updated import

const router = express.Router();

// Fetch all notifications for a user
router.get("/:userId", async (req, res) => {
  try {
    const notifications = await Notify.find({ userId: req.params.userId }).sort(
      { createdAt: -1 }
    );
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark notification as read
router.put("/:id/read", async (req, res) => {
  try {
    await Notify.findByIdAndUpdate(req.params.id, { isRead: true });
    res.status(200).json({ message: "Notification marked as read" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// **Unmark notification (mark as unread)**
router.put("/:id/unread", async (req, res) => {
  try {
    await Notify.findByIdAndUpdate(req.params.id, { isRead: false });
    res.status(200).json({ message: "Notification marked as unread" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete notification
router.delete("/:id", async (req, res) => {
  try {
    await Notify.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new notification
router.post("/", async (req, res) => {
  try {
    const { userId, message, type } = req.body;
    const newNotification = new Notify({ userId, message, type });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
