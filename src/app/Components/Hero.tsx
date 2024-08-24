/* eslint-disable @next/next/no-img-element */
import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion"; // Import framer-motion

interface User {
  id: string;
  fullName: string;
  address: string;
  email: string;
  password: string;
  userType: string;
  languages: string[];
  image: string;
  createdAt: string;
  updatedAt: string;
}
interface TourGuide {
  filter(arg0: (guide: any) => any): unknown;
  id: string;
  userId: string;
  location: string;
  offerRange: number;
  aboutMe: string;
  motto: string;
  thingsToDo: string[];
  summary: string;
  tourHighlights: string[];
  rating: number | null;
  user: User;
  reviews: any[]; // Adjust the type of reviews as needed
}

const Hero: React.FC = () => {
  return (
    <div className="flex relative w-full h-full flex-col justify-center">
      <div className=" relative w-full h-full md:h-[32.75rem] bg-cover bg-center">
        {/* <img
          className="absolute w-full h-full  md:h-[32.75rem] object-cover mix-blend-overlay"
          src="/image 3.jpg"
          alt=""
        /> */}
        <video
          // className="absolute top-0 left-0 w-full h-full object-cover"
          className="absolute w-full h-full  md:h-[32.75rem] object-cover mix-blend-overlay"
          autoPlay
          loop
          muted
        >
          <source src="/j'adoreivc.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="md:h-[32.75rem] realtive top-0 pt-[9rem] md:pt-[10rem] pb-[5rem] md:pb-[5rem] bg-cover bg-gradient-to-r from-green-900 to-orange-800">
          <div className="relative top-[2.75rem] md:top-[4.75rem] flex flex-col justify-center text-center font-bold text-white">
            <motion.div
              id="Titel"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 2.3 }}
              className="text-[5rem] md:text-[10.5rem] tracking-normal"
            >
              <h1>
                Dis
                <span className="text-border">co</span>
                ver
              </h1>
            </motion.div>
            <motion.div
              id="hero-title2"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.65 }}
              className="text-[2.5rem] md:text-[3.3rem] mt-[-0.5rem] tracking-tighter md:tracking-normal relative top-[-2rem] md:top-0 md:mt-[-4.5rem] font-normal"
            >
              <h1>the wonders of Côte d&apos;Ivoire</h1>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
