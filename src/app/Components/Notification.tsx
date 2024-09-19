import React, { useState, useEffect } from "react";
import axiosInstance from "@/src/lib/utils";

interface Notification {
  id: number;
  type: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

const NotificationBar = () => {
  // const [notifications, setNotifications] = useState<Notification[]>([]);
  const notifications = [
    { id: 1, message: "notification from @Ibuzu." },
    { id: 2, message: "notification from @Ibuzu." },
    { id: 3, message: "notification from @Ibuzu." },
  ];
  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       const response = await axiosInstance.get("/api/notifications");
  //       const data = await response.data;
  //       setNotifications(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error fetching notifications:", error);
  //     }
  //   };

  //   fetchNotifications();

  //   // Optional: Poll for new notifications every 30 seconds
  //   const intervalId = setInterval(fetchNotifications, 30000);

  //   // Clean up the interval on component unmount
  //   return () => clearInterval(intervalId);
  // }, []);
  return (
    <div className="bg-white absolute top-[3.5rem] md:top-[5rem] shadow-lg z-20 right-[1rem] md:right-[2rem] lg:right-[15rem] p-4 py-8 rounded-xl">
      <div className="text-lg mb-2 text-emerald-600 text-center w-full">
        NOTIFICATIONS
      </div>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="text-gray-700 text-[0.95rem] py-[0.35rem] border-b border-emerald-600"
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default NotificationBar;
