import Image from "next/image";
import React from "react";
import cityIcon from "../../../public/1.svg.png";

const PopularThings = () => {
  return (
    <div className="p-[2rem] pt-[2.25rem] pb-[1rem] w-full flex flex-col justify-center">
      <div className="w-full flex justify-between">
        <div className="py-[1.25rem]">
          <h1 id="mini-header" className="font-bold text-lg  md:text-[2rem]">
            Popular Things to do
          </h1>
        </div>
        <button
          id="viewMore"
          className="text-white text-sm tracking-wider font-light bg-orange-400 uppercase rounded-[2rem] -space-y-3 px-[1.75rem]"
        >
          View More
        </button>
      </div>
      <div className="w-full h-full grid grid-cols-2 md:grid-cols-6 py-[2.5rem] px-[0.25rem] space-x-8">
        <div className="md:relative -right-2 rounded-3xl w-fit bg-slate-50 border-2 border-emerald-600 stroke-emerald-600 p-[4.5rem] py-[3.5rem] flex flex-col">
          <div>
            <Image src={cityIcon} alt="cityIcon" width={100} height={100} />
          </div>
          <div className="">
            <p className="text-teal-950 text-center font-bold">City Tous</p>
          </div>
          <div className="">
            <p>100 + Tours</p>
          </div>
        </div>
        <div className="md:relative -left-2 rounded-3xl w-fit bg-slate-50 border-2 border-emerald-600 stroke-emerald-600 p-[4.5rem] py-[3.5rem] flex flex-col">
          <div>
            <Image src={cityIcon} alt="cityIcon" width={100} height={100} />
          </div>
          <div className="">
            <p className="text-teal-950 text-center font-bold">City Tous</p>
          </div>
          <div className="">
            <p>100 + Tours</p>
          </div>
        </div>
        <div className="rounded-3xl w-fit bg-slate-50 border-2 border-emerald-600 stroke-emerald-600 p-[4.5rem] py-[3.5rem] flex flex-col">
          <div>
            <Image src={cityIcon} alt="cityIcon" width={100} height={100} />
          </div>
          <div className="">
            <p className="text-teal-950 text-center font-bold">City Tous</p>
          </div>
          <div className="">
            <p>100 + Tours</p>
          </div>
        </div>
        <div className="rounded-3xl w-fit bg-slate-50 border-2 border-emerald-600 stroke-emerald-600 p-[4.5rem] py-[3.5rem] flex flex-col">
          <div>
            <Image src={cityIcon} alt="cityIcon" width={100} height={100} />
          </div>
          <div className="">
            <p className="text-teal-950 text-center font-bold">City Tous</p>
          </div>
          <div className="">
            <p>100 + Tours</p>
          </div>
        </div>
        <div className="rounded-3xl w-fit bg-slate-50 border-2 border-emerald-600 stroke-emerald-600 p-[4.5rem] py-[3.5rem] flex flex-col">
          <div>
            <Image src={cityIcon} alt="cityIcon" width={100} height={100} />
          </div>
          <div className="">
            <p className="text-teal-950 text-center font-bold">City Tous</p>
          </div>
          <div className="">
            <p>100 + Tours</p>
          </div>
        </div>
        <div className="rounded-3xl w-fit bg-slate-50 border-2 border-emerald-600 stroke-emerald-600 p-[4.5rem] py-[3.5rem] flex flex-col">
          <div>
            <Image src={cityIcon} alt="cityIcon" width={100} height={100} />
          </div>
          <div className="">
            <p className="text-teal-950 text-center font-bold">City Tous</p>
          </div>
          <div className="">
            <p>100 + Tours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularThings;
