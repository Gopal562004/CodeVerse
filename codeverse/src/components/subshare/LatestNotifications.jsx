import React from "react";

const notifications = [
  { type: "like", message: "User1 liked your post.", time: "2m" },
  { type: "message", message: "User2 sent you a message.", time: "5m" },
  { type: "follow", message: "User3 started following you.", time: "10m" },
];

const NotificationItem = ({ type, message, time }) => {
  const iconTypes = {
    like: "👍",
    message: "💬",
    follow: "👤",
  };

  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-700 rounded-lg">
      <div className="flex items-center space-x-2">
        <span className="text-xl">{iconTypes[type]}</span>
        <span>{message}</span>
      </div>
      <span className="text-gray-500 text-sm">{time}</span>
    </div>
  );
};

const LatestNotifications = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-4">
      <h2 className="text-lg font-semibold mb-4">Latest Notifications</h2>
      {notifications.map((notification, index) => (
        <NotificationItem
          key={index}
          type={notification.type}
          message={notification.message}
          time={notification.time}
        />
      ))}
    </div>
  );
};

export default LatestNotifications;
