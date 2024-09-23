import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { useState, useEffect } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://jadoreivc-backend.vercel.app",
  withCredentials: true,
});
// const axiosInstance = axios.create({
//   baseURL: "/api",
//   withCredentials: true,
// });

export const getUser = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};
// Function to get the initial value from localStorage
export const getInitialSelectedGuide = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('GuideId');
  }
  return null;
};

// Custom hook to manage the selected guide and localStorage synchronization
export const useSelectedGuide = () => {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(getInitialSelectedGuide());

  // Update localStorage whenever selectedGuide changes
  useEffect(() => {
    if (selectedGuide !== null) {
      localStorage.setItem('GuideId', selectedGuide);
    } else {
      localStorage.removeItem('GuideId');
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
