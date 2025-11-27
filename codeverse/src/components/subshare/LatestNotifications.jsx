// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const iconTypes = {
//   like: "👍",
//   message: "💬",
//   follow: "👤",
// };

// const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
//   return (
//     <div
//       className={`flex items-center justify-between p-2 hover:bg-gray-700 rounded-lg ${
//         notification.isRead ? "bg-gray-900" : "bg-gray-800"
//       }`}
//     >
//       <div className="flex items-center space-x-2">
//         <span className="text-lg">{iconTypes[notification.type]}</span>
//         <span className={notification.isRead ? "text-gray-400" : "font-bold"}>
//           {notification.message}
//         </span>
//       </div>
//       <div className="flex items-center space-x-2">
//         <button
//           onClick={() => onMarkAsRead(notification._id)}
//           className="text-blue-400 text-xs"
//         >
//           {notification.isRead ? "Read" : "Mark as Read"}
//         </button>
//         <button
//           onClick={() => onDelete(notification._id)}
//           className="text-red-500 text-xs"
//         >
//           ❌
//         </button>
//       </div>
//     </div>
//   );
// };

// const LatestNotifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?._id;

//   useEffect(() => {
//     if (userId) {
//       fetchNotifications();
//       const intervalId = setInterval(fetchNotifications, 5000);
//       return () => clearInterval(intervalId);
//     }
//   }, [userId]);

//   const fetchNotifications = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/notifications/${userId}`
//       );
//       setNotifications(res.data);
//     } catch (err) {
//       console.error("Error fetching notifications:", err);
//     }
//   };

//   const markAsRead = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/notifications/${id}/read`);
//       setNotifications((prev) =>
//         prev.map((notif) =>
//           notif._id === id ? { ...notif, isRead: true } : notif
//         )
//       );
//     } catch (err) {
//       console.error("Error marking notification as read:", err);
//     }
//   };

//   const deleteNotification = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/notifications/${id}`);
//       setNotifications((prev) => prev.filter((notif) => notif._id !== id));
//     } catch (err) {
//       console.error("Error deleting notification:", err);
//     }
//   };

//   return (
//     <div className="bg-gray-800 p-4 rounded-lg mt-4 max-w-xs md:max-w-md w-full mx-auto mb-6">
//       <h2 className="text-lg font-semibold mb-2 text-center">Notifications</h2>
//       <div
//         className="space-y-2 overflow-y-auto scrollbar-hide"
//         style={{ maxHeight: notifications.length > 3 ? "180px" : "auto" }}
//       >
//         {notifications.length === 0 ? (
//           <p className="text-gray-400 text-center">No new notifications</p>
//         ) : (
//           notifications.map((notification) => (
//             <NotificationItem
//               key={notification._id}
//               notification={notification}
//               onMarkAsRead={markAsRead}
//               onDelete={deleteNotification}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default LatestNotifications;


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Bell,
  Heart,
  MessageCircle,
  UserPlus,
  Check,
  Trash2,
  X,
} from "lucide-react";

const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case "like":
        return <Heart size={16} className="text-red-500" fill="currentColor" />;
      case "message":
        return <MessageCircle size={16} className="text-blue-500" />;
      case "follow":
        return <UserPlus size={16} className="text-green-500" />;
      default:
        return <Bell size={16} className="text-gray-400" />;
    }
  };

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
        notification.isRead
          ? "bg-[#0a0f1f] border-gray-800"
          : "bg-blue-600/10 border-blue-600/30"
      }`}
    >
      <div className="flex items-center gap-3 flex-grow min-w-0">
        <div className="flex-shrink-0">
          {getNotificationIcon(notification.type)}
        </div>
        <span
          className={`text-sm truncate ${
            notification.isRead ? "text-gray-300" : "text-white font-medium"
          }`}
        >
          {notification.message}
        </span>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
        {!notification.isRead && (
          <button
            onClick={() => onMarkAsRead(notification._id)}
            className="p-1 text-blue-600 hover:text-blue-500 transition-colors"
            title="Mark as read"
          >
            <Check size={14} />
          </button>
        )}
        <button
          onClick={() => onDelete(notification._id)}
          className="p-1 text-red-600 hover:text-red-500 transition-colors"
          title="Delete notification"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

const LatestNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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

  const markAllAsRead = async () => {
    try {
      await axios.put(`http://localhost:5000/notifications/${userId}/read-all`);
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, isRead: true }))
      );
    } catch (err) {
      console.error("Error marking all notifications as read:", err);
    }
  };

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  return (
    <div className="bg-[#0a0f1f] p-4 rounded-xl border border-gray-800 w-full max-w-xs md:max-w-md mx-auto mt-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Bell size={20} />
          Notifications
          {unreadCount > 0 && (
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount} new
            </span>
          )}
        </h2>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-blue-600 hover:text-blue-500 text-sm transition-colors"
          >
            Mark all read
          </button>
        )}
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Bell size={32} className="mx-auto mb-2 opacity-50" />
            <p>No notifications</p>
            <p className="text-sm text-gray-500 mt-1">You're all caught up!</p>
          </div>
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