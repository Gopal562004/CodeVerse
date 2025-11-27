import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

const iconTypes = {
  like: "👍",
  message: "💬",
  follow: "👤",
};

const NotificationItem = React.memo(
  ({ notification, onMarkAsRead, onDelete }) => (
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
  )
);

const Notify = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const lastNotificationRef = useRef(null);
  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  const fetchNotifications = useCallback(async () => {
    if (loading || !userId) return;
    setLoading(true);

    try {
      const lastId = notifications.length > 0 ? notifications[0]._id : "";
      const res = await axios.get(
        `${BASE_URL}/notifications/${userId}?lastId=${lastId}`
      );

      if (res.data.length > 0) {
        setNotifications((prev) => {
          const newNotifs = res.data.filter(
            (n) => !prev.find((p) => p._id === n._id)
          );
          return [...newNotifs, ...prev];
        });
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  }, [BASE_URL, userId, loading, notifications]);

  const markAsRead = useCallback(
    async (id) => {
      try {
        await axios.put(`${BASE_URL}/notifications/${id}/read`);
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
        );
      } catch (err) {
        console.error("Error marking as read:", err);
      }
    },
    [BASE_URL]
  );

  const deleteNotification = useCallback(
    async (id) => {
      try {
        await axios.delete(`${BASE_URL}/notifications/${id}`);
        setNotifications((prev) => prev.filter((n) => n._id !== id));
      } catch (err) {
        console.error("Error deleting notification:", err);
      }
    },
    [BASE_URL]
  );

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNotifications();
        }
      },
      { threshold: 1 }
    );

    if (lastNotificationRef.current) {
      observer.observe(lastNotificationRef.current);
    }

    return () => {
      if (lastNotificationRef.current) {
        observer.unobserve(lastNotificationRef.current);
      }
    };
  }, [fetchNotifications, hasMore, loading]);

  useEffect(() => {
    if (userId) fetchNotifications();
  }, [userId, fetchNotifications]);

  return (
    <div className="p-4 rounded-lg mt-4 w-full max-w-xs md:max-w-md mx-auto h-64 md:h-72">
      <h2 className="text-lg font-semibold mb-2 text-center">Notifications</h2>
      <div className="overflow-y-auto h-52 md:h-60 space-y-2">
        {notifications.length === 0 && !loading ? (
          <p className="text-gray-400 text-center">No new notifications</p>
        ) : (
          notifications.map((notif) => (
            <NotificationItem
              key={notif._id}
              notification={notif}
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
