import React, { useState, useEffect, CSSProperties } from "react";
import axiosInstance from "@/src/lib/utils";
import ClipLoader from "react-spinners/ClipLoader";
import { FaBell } from "react-icons/fa";

interface NotificationBarProps {
  markAsRead: any;
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
  markAsRead,
  notifications,
  nloading,
  onNotificationsChange,
  onLoadingChange,
}) => {
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
                  className={`${
                    notification.is_read ? "read" : ""
                  } px-4 py-3 text-gray-700 hover:bg-gray-100 cursor-pointer`}
                >
                  <button onClick={() => markAsRead(notification.id)}>
                    <strong>{notification.subject}</strong>
                  </button>
                  <p>{notification.message}</p>
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
