/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FaTruckPlane } from "react-icons/fa6";
// import { XlviLoader } from "react-awesome-loaders";

const LoadingScreen: React.FC = () => {
  return (
    <div
      id="Loader"
      className="flex justify-center flex-col w-full items-center h-screen bg-white"
    >
      <svg className="top-[-3.5rem] relative" viewBox="0 0 100 100">
        <g>
          <path d="M 50,100 A 1,1 0 0 1 50,0" />
        </g>
        <g>
          <path d="M 50,75 A 1,1 0 0 0 50,-25" />
        </g>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#059669", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#F97316", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
      </svg>
      {/* <div className="relative">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-orange-400 border-solid"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-teal-900">
          <div className="animate-bounce">
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
          </div>
        </div>
      </div> */}
      <p className="text-3xl md:text-5xl font-bold text-emerald-700 animate-pulse">
        J’ADOREIVC
      </p>
    </div>
  );
};

export default LoadingScreen;
