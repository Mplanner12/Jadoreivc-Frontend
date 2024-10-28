/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import ClipLoader from "react-spinners/ClipLoader";

interface User {
  id: string;
  fullName: string;
  profileImage: string;
  userType: string;
  loading: boolean;
}

interface UserPopUpProps {
  // fullName: string;
  // profileImage: string;
  loading: boolean;
  userType: string;
  // onSwitchToTourGuide: () => void;
  // onSwitchToTourist: () => void;
  onLogout: () => void;
  user: any;
  // user: User;
}

const UserPopUp: React.FC<UserPopUpProps> = ({
  // fullName,
  // profileImage,
  // onSwitchToTourGuide,
  // onSwitchToTourist,
  loading,
  onLogout,
  user,
  userType,
}) => {
  return (
    <div
      className={`absolute z-20 ml-[-1rem] gap-y-[1rem] md:ml-[1rem] ${
        user
          ? "mt-[18.75rem] md:mt-[20.5rem]"
          : "mt-[11.85rem] md:mt-[10.75rem]"
      } flex flex-col items-center p-[2rem] py-[0.75rem] md:py-[2rem] bg-white shadow-lg rounded-lg`}
    >
      <div className="justify-center items-center mr-1 w-full flex flex-col gap-y-2 md:gap-y-[1rem] h-full">
        {/* Moved loading and user check outside to avoid nesting issues */}
        {loading ? (
          <ClipLoader
            color="green"
            loading={user.loading}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : user ? (
          <>
            <Link
              href={`/profile/${user.id}`}
              className="w-full flex justify-center items-center"
            ></Link>
            <Link
              href={`/profile/${user.id}`}
              className="w-fit p-2 md:p-3 flex justify-center items-center shadow-md rounded-xl border border-emerald-600 hover:bg-orange-400 hover:text-white after:bg-emerald-600 after:text-white"
            >
              ACCOUNT
            </Link>
            {/* <Link // Changed div to Link for consistency
              href={"/messages"} // Added href for navigation
              className="w-fit p-2 md:p-3 flex justify-center items-center shadow-md rounded-xl border border-emerald-600 hover:bg-orange-400 hover:text-white after:bg-emerald-600 after:text-white"
            >
              MESSAGES
            </Link> */}
            <Link
              href={`/help`}
              className="w-full p-2 md:p-3 flex justify-center items-center shadow-md rounded-xl border border-emerald-600 hover:bg-orange-400 hover:text-white after:bg-emerald-600 after:text-white"
            >
              HELP
            </Link>
            <button
              onClick={onLogout}
              className="w-full p-2 md:p-3 flex justify-center items-center shadow-md border border-emerald-600 rounded-xl hover:bg-orange-400 hover:text-white after:bg-emerald-600 after:text-white"
            >
              LOGOUT
            </button>
          </>
        ) : (
          <div className="w-[16rem] md:w-fit" id="authContainer">
            <a className="w-fit h-full" href={"/signUp"}>
              <h1
                // id="auth"
                className="font-semibold w-[5rem] text-[1.25rem]"
              >
                Sign up
              </h1>
            </a>
            <div
              // id="loginHead"
              className="w-full md:w-[2.25rem] h-full"
            >
              <a href={"/logIn"}>
                <h1 id="auth" className="font-semibold text-[1.25rem]">
                  Login
                </h1>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPopUp;

{
  /* <p className="font-semibold mb-2">{fullName}</p> */
}
{
  /* {user.userType === "TOURIST" ? (
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
      )} */
}
