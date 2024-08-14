/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FaTruckPlane } from "react-icons/fa6";

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-emerald-600">
      <div className="relative">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-orange-400 border-solid"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-teal-900">
          <div className="animate-bounce">
            {/* <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657l-1.414 1.414m-2.829 0a5 5 0 11-7.07-7.07l1.415-1.415a5 5 0 017.07 7.07zM11 11l4.243-4.243a4 4 0 10-5.657-5.657L5.343 5.343M9 15l-4.243 4.243a4 4 0 005.657 5.657L15 17"
              />
            </svg> */}
            <FaTruckPlane size={60} color="black" />
          </div>
          <div className="text-[2.2rem] mt-[4.5rem] flex justify-center gap-x-[0.5rem] items-center font-bold text-orange-400">
            <div className="font-normal"> Exploring</div>{" "}
            <img
              width={100}
              height={100}
              className="w-[7rem] h-[6.5rem]"
              src="/logoJadoreivc.png"
              alt="logo"
            />
            {/* <div className=" text-teal-900 font-bold">J’adoreivc...</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
