import React, { useState, useEffect, CSSProperties } from "react";
import axiosInstance from "@/src/lib/utils";
import ClipLoader from "react-spinners/ClipLoader";
import { FaBell } from "react-icons/fa";

interface NotificationBarProps {
  notifications: any[];
  nloading: boolean;
  onNotificationsChange: (newNotifications: any[]) => void;
  onLoadingChange: (isLoading: boolean) => void;
}

interface Notification {
  id: number;
  type: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const NotificationBar: React.FC<NotificationBarProps> = ({
  notifications,
  nloading,
  onNotificationsChange,
  onLoadingChange,
}) => {
  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       const response = await axiosInstance.get("/api/notifications");
  //       const data = await response.data;
  //       setNotifications(data);
  //     } catch (error) {
  //       console.error("Error fetching notifications:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchNotifications();

  //   // Poll for new notifications
  //   const intervalId = setInterval(fetchNotifications, 30000);
  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <div className="relative inline-block text-left">
      {notifications && (
        <div className="origin-top-right z-20 absolute right-[-5.75rem] lg:right-[-6.5rem] mt-2 lg:mt-[2.5rem] w-72 lg:w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
          <div className="py-1">
            {nloading ? (
              <ClipLoader
                cssOverride={override}
                color="green"
                loading={nloading}
                size={25}
                aria-label="Loading Spinner"
              />
            ) : notifications.length === 0 ? (
              <p className="text-center text-gray-500 py-3">No notifications</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="px-4 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {notification.message}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBar;
