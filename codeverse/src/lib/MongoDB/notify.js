import axios from "axios";

const API_URL = "http://localhost:5000/notifications"; // Base API URL

const notificationService = {
  // ✅ Send a notification (POST)
  sendNotification: async (userId, message, type) => {
    try {
      const response = await axios.post(API_URL, { userId, message, type });
      return response.data;
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  },

  // ✅ Get user notifications (GET)
  getNotifications: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  },

  // ✅ Mark a notification as read (PUT)
  markAsRead: async (notificationId) => {
    try {
      await axios.put(`${API_URL}/${notificationId}/read`);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  },

  // ✅ Delete a notification (DELETE)
  deleteNotification: async (notificationId) => {
    try {
      await axios.delete(`${API_URL}/${notificationId}`);
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  },
};

export default notificationService;
