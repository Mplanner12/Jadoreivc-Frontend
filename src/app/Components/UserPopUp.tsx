/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";

interface User {
  id: string;
  fullName: string;
  profileImage: string;
  userType: string;
  loading: boolean;
}

interface UserPopUpProps {
  fullName: string;
  profileImage: string;
  userType: string;
  // onSwitchToTourGuide: () => void;
  // onSwitchToTourist: () => void;
  onLogout: () => void;
  user: User;
}

const UserPopUp: React.FC<UserPopUpProps> = ({
  fullName,
  profileImage,
  // onSwitchToTourGuide,
  // onSwitchToTourist,
  onLogout,
  user,
  userType,
}) => {
  return (
    <div className="absolute z-20 ml-[-6rem] gap-y-[1rem] md:ml-[-2rem] flex flex-col items-center p-[2rem] bg-white shadow-lg rounded-lg">
      <div
        // href={`/profile/${user.id}`}
        className="w-full flex justify-center items-center"
      >
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-14 h-14 md:w-11 md:h-11 rounded-full mb-1"
          />
        ) : (
          <div className="flex justify-center items-center w-fit rounded-full border-[1px] border-emerald-600">
            <FaRegCircleUser size={45} />
          </div>
        )}
      </div>
      <Link
        href={`/profile/${user.id}`}
        className="w-full p-[0.35rem] flex justify-center items-center shadow-md rounded-xl border border-emerald-600"
      >
        view Profile
      </Link>
      {/* <p className="font-semibold mb-2">{fullName}</p> */}
      {/* {user.userType === "TOURIST" ? (
        <button
          onClick={onSwitchToTourGuide}
          className="w-full py-2 px-4 mb-2 rounded-3xl text-white bg-orange-400 hover:bg-orange-600"
        >
          SWITCH TO TOUR GUIDE
        </button>
      ) : (
        <button
          onClick={onSwitchToTourist}
          className="w-full py-2 px-4 mb-2 rounded-3xl text-white bg-orange-400 hover:bg-orange-600"
        >
          SWITCH TO TOURIST
        </button>
      )} */}
      <button
        onClick={onLogout}
        className="w-full py-2 text-gray-700 font-semibold rounded-lg hover:bg-gray-300"
      >
        LOGOUT
      </button>
    </div>
  );
};

export default UserPopUp;
