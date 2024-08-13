/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import axiosInstance from "@/src/lib/utils";
import React, {
  createContext,
  useEffect,
  useState,
  CSSProperties,
} from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface User {
  id: string;
  fullName: string;
  profileImage: string;
  userType: string;
  loading: boolean;
}

const UserContext = createContext<User | any>(null);

const UserProvider: React.FC<any> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | any>(null);
  let [loading, setLoading] = useState<boolean>(true);

  // Function to update the user state on login
  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  // Function to update the user state on logout
  useEffect(() => {
    // Fetch the current user
    const fetchUser = async () => {
      try {
        const { data } = await axiosInstance.get("/api/users/auth/currentUser");
        setUser(data.user);
        // console.log(user?.fullName.split("")[0]);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
