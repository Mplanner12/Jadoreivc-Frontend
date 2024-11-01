"use client";
import Link from "next/link";
import React, { useState, CSSProperties, useEffect } from "react";
import { PiPencilLineLight } from "react-icons/pi";
import Dropdown from "./Dropdown";
import HamburgerMenu from "./Hamburger";
import { useContext } from "react";
import UserPopUp from "./UserPopUp";
import { UserContext } from "../context/UserContex";
import DotLoader from "react-spinners/DotLoader";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import axiosInstance, { getUserRole, getUser } from "@/src/lib/utils";
import { motion } from "framer-motion"; // Import motion
import { BiSolidUser } from "react-icons/bi";
import NotificationBar from "./Notification";
import { FaBell } from "react-icons/fa";

interface HeaderProps {
  fullName: string;
  profileImage: string;
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const Header = () => {
  let userRole = getUserRole();
  const { user, loading, setUser } = useContext(UserContext);
  const router = useRouter();

  const [showPopUp, setShowPopUp] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState<any>([]);
  const [nloading, setnLoading] = useState<boolean>(true);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      setnLoading(true);
      try {
        const response = await axiosInstance.get("/api/notifications");
        const data = await response.data;
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setnLoading(false);
      }
    };

    fetchNotifications();

    // Poll for new notifications
    const intervalId = setInterval(fetchNotifications, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const markAsRead = async (notificationId: number) => {
    try {
      // Implementing API call to mark notification as read on the backend
      await axiosInstance.put(`/api/notifications/${notificationId}/mark-read`);

      // Update the UI optimistically
      setNotifications((prevNotifications: any[]) =>
        prevNotifications.map((n: { id: number }) =>
          n.id === notificationId ? { ...n, is_read: true } : n
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const role = getUserRole();

  const logout = async () => {
    try {
      await axiosInstance.get("/api/users/auth/logout");
      setUser(null);
      localStorage.removeItem("userRole");
      window.location.href = "/logIn";
      router.push("/logIn");
    } catch (error) {
      console.error("Logout failed", error);
    }
    setShowPopUp(false);
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row justify-center items-center pb-[0.75rem] pt-[1rem] lg:pb-0 lg:pt-0 border-b-[2px] md:border-0">
      <div className="w-full flex justify-between md:py-[1.5rem] md:px-[3.85rem] md:pr-[4.5rem] md:border-b-[2px]">
        <div className="w-fit gap-x-[1.75rem] flex items-center md:pl-[0rem] relative left-[-0.45rem] lg:left-[-3rem] xl:left-[-2.5rem] lg:pl-[0.25rem]">
          <div className="w-fit h-full flex justify-start items-center">
            <Link
              id="logo"
              href={"/"}
              className="text-emerald-600 font-semibold text-3xl lg:text-[1.5rem] xl:text-3xl"
            >
              J’ADOREIVC
            </Link>
          </div>
          <div className="hidden w-full h-full md:flex justify-start items-center">
            <motion.p
              className="text-orange-400 font-semibold md:text-lg lg:text-[1rem] xl:text-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              YOUR LOCAL PRIVATE TOUR GUIDE
            </motion.p>
          </div>
        </div>
        <div
          id="headerParent"
          className="w-fit flex justify-start items-center gap-x-[0.25rem] ml-[0.2rem] md:ml-0 relative lg:left-[3.5rem] md:gap-x-[2rem] text-slate-900"
        >
          <div className="justify-start items-center hidden md:flex">
            <Link href="/">
              <h1 className="font-semibold text-[1.25rem]">Home</h1>
            </Link>
          </div>
          {/* {loading ? (
            <ClipLoader
              cssOverride={override}
              color="green" // Set your desired loader color
              loading={loading}
              size={25} // Adjust size as needed
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : user ? (
            <>
              {user.userType === "TOUR_GUIDE" && (
                <div className="justify-center items-center hidden md:flex">
                  <Link href={"/customTour"}>
                    <h1 className="font-semibold text-[1.25rem]">Tours</h1>
                  </Link>
                </div>
              )}
            </>
          ) : (
            ""
          )} */}
          <div className="justify-center items-center hidden md:flex">
            <Link href={"/Blog"}>
              <h1 className="font-semibold text-[1.25rem]">Blog</h1>
            </Link>
          </div>
          <div
            id="language"
            className="flex ml-[0.75rem] lg:mr-0 justify-center items-center"
          >
            <Dropdown />
          </div>
          <div className="w-full h-full flex justify-start items-center gap-x-[0.56rem] px-[0.25rem] lg:px-0 lg:gap-x-[2.75rem]">
            <div className="w-full h-full flex flex-col justify-center items-center cursor-pointer">
              {loading ? (
                <ClipLoader
                  cssOverride={override}
                  color="green"
                  loading={loading}
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <button className="p-2 focus:outline-none w-[2.4rem] lg:w-[2.5rem] bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 rounded-full">
                  <BiSolidUser
                    onClick={() => {
                      setShowPopUp(!showPopUp);
                      setShowNotification(false);
                    }}
                    size={26}
                    className="w-full h-full text-black"
                  />
                </button>
              )}
              {showPopUp && (
                <UserPopUp
                  user={user}
                  loading={loading}
                  // profileImage={user.image}
                  // onSwitchToTourGuide={handleSwitchToTourGuide}
                  // onSwitchToTourist={handleSwitchToTourist}
                  onLogout={logout}
                  userType={""}
                />
              )}
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center cursor-pointer">
              {loading ? (
                <ClipLoader
                  cssOverride={override}
                  color="green"
                  loading={loading}
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <button
                  onClick={() => {
                    setShowNotification(!showNotification);
                    setShowPopUp(false);
                  }}
                  className="bg-gray-100 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 relative" // Added "relative" for badge positioning
                >
                  <FaBell size={18} className="h-5 w-5 text-gray-800" />
                  {notifications.length > 0 && !loading && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                      {notifications.length}
                    </span>
                  )}
                </button>
              )}
              {showNotification && (
                <NotificationBar
                  markAsRead={markAsRead}
                  notifications={notifications}
                  nloading={false}
                  onNotificationsChange={function (
                    newNotifications: any[]
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                  onLoadingChange={function (isLoading: boolean): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              )}
            </div>
          </div>

          <div className="pl-[0.5rem] md:hidden z-40 flex justify-center items-center relative left-[0.35rem]">
            {loading ? (
              <ClipLoader
                cssOverride={override}
                color="green"
                loading={loading}
                size={25}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : user ? (
              <HamburgerMenu userRole={userRole} user={user} />
            ) : (
              <HamburgerMenu />
            )}
          </div>
          <div className="w-full h-full hidden md:block">
            {loading ? (
              <DotLoader
                className="relative top-[0.9rem]"
                cssOverride={override}
                color="green"
                loading={loading}
                size={25}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : user && role === "TOURIST" ? (
              <>
                {/* "Tours" link is rendered only if the user is a TOURIST */}
                {userRole === "TOURIST" && (
                  <div className="w-fit hidden md:flex justify-end items-center px-[1.5rem] ">
                    <Link href={`/planTour/${user.id}`}>
                      <button
                        type="submit"
                        className="w-full shadow-lg flex justify-start items-center gap-x-[0.5rem] uppercase py-[1.3rem] px-[0.85rem] text-center font-light text-[1.rem] text-white rounded-full bg-orange-400 hover:bg-emerald-600 hover:text-white"
                      >
                        <PiPencilLineLight
                          size={30}
                          color="white"
                          className=""
                        />
                        <p className="uppercase md:w-[8rem] md:text-sm">
                          Plan your Tour
                        </p>
                      </button>
                    </Link>
                  </div>
                )}
              </>
            ) : role === "TOUR_GUIDE" ? (
              <div className="w-[7rem] p-[1rem]"></div>
            ) : (
              <div className="w-fit flex justify-end items-center px-[1.5rem] ">
                <Link href={`/planTour/${null}`}>
                  <button
                    type="submit"
                    className="w-full flex shadow-lg justify-start items-center gap-x-[0.5rem] uppercase py-[1.3rem] px-[0.85rem] text-center font-light text-[1.rem] text-white rounded-full bg-orange-400 hover:bg-emerald-600 hover:text-white"
                  >
                    <PiPencilLineLight size={30} color="white" className="" />
                    <p className="uppercase md:w-[8rem] md:text-sm">
                      Plan your Tour
                    </p>
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-full md:hidden mt-[0.25rem] mb-[-0.35rem] justify-start items-center">
        <motion.p
          className="text-orange-400 font-semibold text-sm text-start pl-[0.225rem]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {" "}
          YOUR LOCAL PRIVATE TOUR GUIDE
        </motion.p>
      </div>
    </div>
  );
};

export default Header;

//  <div className="flex justify-center items-center mr-1">
//    {loading ? (
//      <ClipLoader
//        cssOverride={override}
//        color="green"
//        loading={loading}
//        size={25}
//        aria-label="Loading Spinner"
//        data-testid="loader"
//      />
//    ) : user ? (
//      <div
//        onClick={() => setShowPopUp(!showPopUp)}
//        className="cursor-pointer mx-auto"
//      >
//        <h1 id="userName" className="font-semibold text-[1.25rem]">
//          {user.fullName.split(" ")[0]}
//        </h1>
//        {showPopUp && (
//          <UserPopUp
//            user={user}
//            fullName={user.fullName}
//            profileImage={user.image}
//            // onSwitchToTourGuide={handleSwitchToTourGuide}
//            // onSwitchToTourist={handleSwitchToTourist}
//            onLogout={logout}
//            userType={""}
//          />
//        )}
//      </div>
//    ) : (
//      <div className="w-full h-full">
//        <div
//          id="authparent"
//          className="md:hidden relative w-full md:w-fit h-full flex justify-start md:gap-x-[0.15rem] items-center"
//        >
//          <div
//            className="w-[7rem] md:w-fit h-full flex justify-start gap-x-[0.1rem] items-center"
//            onClick={() => setShowAuthDropdown(!showAuthDropdown)}
//          >
//            <h1 id="auth" className="font-semibold text-[1.25rem]">
//              {showAuthDropdown ? "Login" : "Sign up"}
//            </h1>
//            <BsChevronDown id="authIcon" size={12} />
//          </div>
//          {/* mobile auth dropdown */}
//          {showAuthDropdown && (
//            <div
//              className="absolute top-full left-0 bg-white shadow-md rounded-md mt-1 z-10"
//              style={{ width: "100%" }}
//            >
//              <Link
//                href={"/signUp"}
//                className="block px-4 py-2 hover:bg-gray-100"
//              >
//                Sign up
//              </Link>
//              <Link
//                href={"/logIn"}
//                className="block px-4 py-2 hover:bg-gray-100"
//              >
//                Login
//              </Link>
//            </div>
//          )}
//          {/* mobile auth dropdown */}
//        </div>
//        {/* <div
//             id="authparent"
//             className="hidden md:flex relative w-full md:w-fit h-full justify-start md:gap-x-[0.15rem] items-center"
//           >
//             <div id="authContainer" className="w-full md:w-[5rem] h-full">
//               <Link href={"/signUp"}>
//                 <h1 id="auth" className="font-semibold text-[1.25rem]">
//                   Sign up
//                 </h1>
//               </Link>
//             </div>
//             <div id="loginHead" className="w-full md:w-[2.25rem] h-full">
//               <Link href={"/logIn"}>
//                 <h1 id="auth" className="font-semibold text-[1.25rem]">
//                   Login
//                 </h1>
//               </Link>
//             </div>
//           </div> */}
//      </div>
//    )}
//  </div>;
