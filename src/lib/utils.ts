import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { useState, useEffect } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://jadoreivc-backend.vercel.app",
  withCredentials: true,
});

export const getUser = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};
export const getInitialSelectedGuide = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("GuideId");
  }
  return null;
};

export const useSelectedGuide = () => {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(
    getInitialSelectedGuide()
  );

  useEffect(() => {
    if (selectedGuide !== null) {
      localStorage.setItem("GuideId", selectedGuide);
    } else {
      localStorage.removeItem("GuideId");
    }
  }, [selectedGuide]);

  return [selectedGuide, setSelectedGuide] as const;
};

export const getUserRole = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userRole");
  }
  return null;
};

export default axiosInstance;


export const createNotification = async (
  userId: string,
  subject: string,
  message: string
) => {
  try {
    const response = await axiosInstance.post("/api/notifications", {
      userId,
      subject,
      message,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
};