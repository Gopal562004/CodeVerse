import React, { useEffect, useState } from "react";
import axios from "axios";

const iconTypes = {
  like: "👍",
  message: "💬",
  follow: "👤",
};

const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
  return (
    <div
      className={`flex items-center justify-between p-2 hover:bg-gray-700 rounded-lg ${
        notification.isRead ? "bg-gray-900" : "bg-gray-800"
      }`}
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg">{iconTypes[notification.type]}</span>
        <span className={notification.isRead ? "text-gray-400" : "font-bold"}>
          {notification.message}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onMarkAsRead(notification._id)}
          className="text-blue-400 text-xs"
        >
          {notification.isRead ? "Read" : "Mark as Read"}
        </button>
        <button
          onClick={() => onDelete(notification._id)}
          className="text-red-500 text-xs"
        >
          ❌
        </button>
      </div>
    </div>
  );
};

const LatestNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    if (userId) {
      fetchNotifications();
      const intervalId = setInterval(fetchNotifications, 5000);
      return () => clearInterval(intervalId);
    }
  }, [userId]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/notifications/${userId}`
      );
      setNotifications(res.data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === id ? { ...notif, isRead: true } : notif
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notifications/${id}`);
      setNotifications((prev) => prev.filter((notif) => notif._id !== id));
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-4 max-w-xs md:max-w-md w-full mx-auto mb-6">
      <h2 className="text-lg font-semibold mb-2 text-center">Notifications</h2>
      <div
        className="space-y-2 overflow-y-auto scrollbar-hide"
        style={{ maxHeight: notifications.length > 3 ? "180px" : "auto" }}
      >
        {notifications.length === 0 ? (
          <p className="text-gray-400 text-center">No new notifications</p>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onMarkAsRead={markAsRead}
              onDelete={deleteNotification}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default LatestNotifications;
