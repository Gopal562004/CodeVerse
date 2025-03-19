const Notify = require("../models/notify"); // Import Mongoose Model

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join room for user-specific notifications
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their notification room`);
    });

    // Listen for new notifications
    socket.on("sendNotification", async (data) => {
      try {
        const newNotification = new Notify({
          userId: data.userId,
          type: data.type,
          message: data.message,
        });

        await newNotification.save();

        // Emit notification to the specific user
        io.to(data.userId).emit("newNotification", newNotification);
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    });

    // Delete Notification
    socket.on("deleteNotification", async (notificationId) => {
      try {
        await Notify.findByIdAndDelete(notificationId);
        io.emit("deleteNotification", notificationId);
      } catch (error) {
        console.error("Error deleting notification:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

module.exports = socketHandler;
