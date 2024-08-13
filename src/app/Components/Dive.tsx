/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { BsArrowDown } from "react-icons/bs";

const Dive = () => {
  return (
    <div>
      <div className="w-full h-full p-[1.5rem] py-[1.25rem]">
        <img src="/Buildings2.png" alt="button" className="mx-auto" />
      </div>
      <h1 className="uppercase tracking-[0.185em] text-green-600 text-[0.9rem] font-[450] md:text-sm py-[0rem] text-center mt-[0.75rem]">
        Dive into Culture, Nature, and Adventure
      </h1>
      <div className="flex justify-center pt-[2.25rem] pb-[1.25rem] -mt-[0.25rem] md:-mt-[1.25rem] mb-[2rem] md:mb-[1.8rem]">
        <button className="rounded-full bg-orange-400 p-[0.5rem] md:p-[0.75rem] py-[1.85rem] md:py-[1rem]">
          <BsArrowDown
            color="white"
            className="w-[3.75rem] md:w-[1.75rem]"
            size={25}
          />
        </button>
      </div>
    </div>
  );
};

export default Dive;
