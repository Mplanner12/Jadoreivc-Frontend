import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://jadoreivc-backend.vercel.app",
  withCredentials: true,
});

export const getUserRole = () => {
  if (typeof window !== "undefined") {
    // Check if window is defined
    return localStorage.getItem("userRole");
  }
  return null; // Or return a default value
};

export default axiosInstance;
