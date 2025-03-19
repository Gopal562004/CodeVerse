import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const iconTypes = {
  like: "👍",
  message: "💬",
  follow: "👤",
};

const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
  return (
    <div
      className={`flex items-center justify-between p-2 rounded-lg ${
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

const Notify = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const lastNotificationRef = useRef();

  useEffect(() => {
    if (userId) {
      fetchNotifications();
      const intervalId = setInterval(fetchNotifications, 5000);
      return () => clearInterval(intervalId);
    }
  }, [userId]);

  const fetchNotifications = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const lastNotificationId =
        notifications.length > 0 ? notifications[0]._id : "";
      const res = await axios.get(
        `http://localhost:5000/notifications/${userId}?lastId=${lastNotificationId}`
      );
      setNotifications((prev) => {
        const newNotifications = res.data.filter(
          (notif) => !prev.some((existing) => existing._id === notif._id)
        );
        return [...newNotifications, ...prev];
      });
      setHasMore(res.data.length > 0);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
    setLoading(false);
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

  useEffect(() => {
    const handleScroll = () => {
      if (
        lastNotificationRef.current &&
        lastNotificationRef.current.getBoundingClientRect().top <=
          window.innerHeight
      ) {
        if (hasMore && !loading) {
          fetchNotifications();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className=" p-4 rounded-lg mt-4 w-full max-w-xs md:max-w-md mx-auto h-64 md:h-72">
      <h2 className="text-lg font-semibold mb-2 text-center">Notifications</h2>
      <div className="overflow-y-auto h-52 md:h-60 space-y-2">
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
        {loading && <div className="text-center text-gray-400">Loading...</div>}
        <div ref={lastNotificationRef}></div>
      </div>
    </div>
  );
};

export default Notify;
