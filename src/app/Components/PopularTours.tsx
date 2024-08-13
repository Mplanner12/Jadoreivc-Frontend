import React from "react";

const PopularTours = () => {
  return (
    <div className="p-[1.5rem] pt-[1rem] pb-[1rem]  w-full flex flex-col justify-center">
      <div className="w-full flex justify-between">
        <div className="py-[1.25rem]">
          <h1 className="font-bold text-lg">Popular Tours</h1>
        </div>
        <button className="text-white text-sm tracking-wider font-light bg-orange-400 uppercase rounded-[2rem] -space-y-3 px-[1.75rem]">
          View More
        </button>
      </div>
    </div>
  );
};

export default PopularTours;
